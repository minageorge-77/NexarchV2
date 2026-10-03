/**
 * Automated MongoDB Backup Script for NexArch
 * 
 * Usage:
 *   node scripts/backup.js
 * 
 * Features:
 *   - Automatically connects to MongoDB via MONGODB_URI
 *   - Exports all active collections (testimonials, contactmessages, admins, sitestats, services, etc.)
 *   - Creates timestamped JSON backups in the /backups directory
 *   - Retention management: automatically removes backups older than 90 days
 *   - Safe for cron jobs on VPS
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Load environment variables (.env.local, .env, or system environment on VPS)
const envLocalPath = path.join(__dirname, "../.env.local");
const envPath = path.join(__dirname, "../.env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const RETENTION_DAYS = 90; // Keep backups for 90 days
const BACKUP_DIR = path.join(__dirname, "../backups");

async function runBackup() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(`[${new Date().toISOString()}] [ERROR] MONGODB_URI is not set in environment or .env file.`);
    process.exit(1);
  }

  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] [INFO] Starting automated NexArch database backup...`);

  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const dbName = db.databaseName;

    // Ensure backups directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    // List all collections
    const collections = await db.listCollections().toArray();
    const backupData = {
      metadata: {
        database: dbName,
        createdAt: new Date().toISOString(),
        version: "1.0.0",
        collectionsCount: collections.length
      },
      collections: {}
    };

    let totalDocsCount = 0;

    for (const colInfo of collections) {
      const colName = colInfo.name;
      if (colName.startsWith("system.")) continue;

      const col = db.collection(colName);
      const docs = await col.find({}).toArray();
      backupData.collections[colName] = docs;
      totalDocsCount += docs.length;

      console.log(`[${new Date().toISOString()}] [INFO] Backed up collection "${colName}": ${docs.length} documents.`);
    }

    // Generate filename with timestamp: backup_YYYY-MM-DD_HH-mm-ss.json
    const dateStr = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").replace(/\..+/, "");
    const fileName = `backup_${dateStr}.json`;
    const filePath = path.join(BACKUP_DIR, fileName);

    fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2));

    const fileSizeKB = (fs.statSync(filePath).size / 1024).toFixed(2);
    console.log(`[${new Date().toISOString()}] [SUCCESS] Backup saved to ${filePath} (${fileSizeKB} KB, ${totalDocsCount} total documents across ${collections.length} collections).`);

    // Clean up old backups based on retention policy
    cleanOldBackups(BACKUP_DIR, RETENTION_DAYS);

    await mongoose.disconnect();
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[${new Date().toISOString()}] [INFO] Backup finished cleanly in ${duration}s.\n`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [ERROR] Backup failed:`, err);
    process.exit(1);
  }
}

function cleanOldBackups(directory, maxDays) {
  try {
    const files = fs.readdirSync(directory);
    const now = Date.now();
    const maxAgeMs = maxDays * 24 * 60 * 60 * 1000;
    let prunedCount = 0;

    for (const file of files) {
      if (!file.startsWith("backup_") || !file.endsWith(".json")) continue;

      const fullPath = path.join(directory, file);
      const stats = fs.statSync(fullPath);
      const ageMs = now - stats.mtimeMs;

      if (ageMs > maxAgeMs) {
        fs.unlinkSync(fullPath);
        prunedCount++;
        console.log(`[${new Date().toISOString()}] [PRUNED] Removed old backup file: ${file}`);
      }
    }

    if (prunedCount > 0) {
      console.log(`[${new Date().toISOString()}] [INFO] Cleaned up ${prunedCount} backup(s) older than ${maxDays} days.`);
    }
  } catch (e) {
    console.warn(`[${new Date().toISOString()}] [WARN] Could not prune old backups:`, e.message);
  }
}

runBackup();
