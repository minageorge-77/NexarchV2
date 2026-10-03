/**
 * Database Restore Script for NexArch
 * 
 * Usage:
 *   node scripts/restore.js                     # Restores the latest backup in /backups
 *   node scripts/restore.js path/to/backup.json # Restores a specific backup file
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const envLocalPath = path.join(__dirname, "../.env.local");
const envPath = path.join(__dirname, "../.env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const BACKUP_DIR = path.join(__dirname, "../backups");

async function runRestore() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found");
    process.exit(1);
  }

  // Find target backup file
  let targetFile = process.argv[2];

  if (!targetFile) {
    if (!fs.existsSync(BACKUP_DIR)) {
      console.error(`Backups directory does not exist: ${BACKUP_DIR}`);
      process.exit(1);
    }

    const files = fs.readdirSync(BACKUP_DIR)
      .filter((f) => f.startsWith("backup_") && f.endsWith(".json"))
      .map((f) => ({
        name: f,
        time: fs.statSync(path.join(BACKUP_DIR, f)).mtimeMs
      }))
      .sort((a, b) => b.time - a.time);

    if (files.length === 0) {
      console.error(`No backup files found in: ${BACKUP_DIR}`);
      process.exit(1);
    }

    targetFile = path.join(BACKUP_DIR, files[0].name);
    console.log(`No file specified. Using latest backup: ${files[0].name}`);
  } else {
    targetFile = path.resolve(targetFile);
  }

  if (!fs.existsSync(targetFile)) {
    console.error(`Backup file not found: ${targetFile}`);
    process.exit(1);
  }

  console.log(`Reading backup file from: ${targetFile}...`);
  const rawData = fs.readFileSync(targetFile, "utf-8");
  const backup = JSON.parse(rawData);

  if (!backup.collections) {
    console.error("Invalid backup file format: missing 'collections' object.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    console.log(`Connected to database "${db.databaseName}". Restoring data...\n`);

    for (const [colName, docs] of Object.entries(backup.collections)) {
      if (!Array.isArray(docs) || docs.length === 0) {
        console.log(`- Collection "${colName}": 0 documents to restore.`);
        continue;
      }

      const col = db.collection(colName);
      // Clean existing collection before restoring
      await col.deleteMany({});
      
      // Parse _id ObjectIds if needed and insert
      const formattedDocs = docs.map(d => {
        const copy = { ...d };
        if (copy._id && typeof copy._id === "string" && copy._id.length === 24) {
          copy._id = new mongoose.Types.ObjectId(copy._id);
        }
        return copy;
      });

      await col.insertMany(formattedDocs);
      console.log(`✓ Restored collection "${colName}": ${docs.length} documents.`);
    }

    console.log("\n[SUCCESS] Database restore completed successfully.");
    await mongoose.disconnect();
  } catch (err) {
    console.error("[ERROR] Restore failed:", err);
    process.exit(1);
  }
}

runRestore();
