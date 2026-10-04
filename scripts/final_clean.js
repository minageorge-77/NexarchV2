
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const ContactMessage = require("../models/ContactMessage").default || require("../models/ContactMessage");
const PageView = require("../models/PageView").default || require("../models/PageView");

async function clean() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const msgs = await ContactMessage.deleteMany({});
    console.log(`Deleted ${msgs.deletedCount} contact messages.`);

    const views = await PageView.deleteMany({});
    console.log(`Deleted ${views.deletedCount} page views.`);

    // If there were any other collections mentioned casually like audit logs
    try {
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();
      for (const col of collections) {
        if (col.name.includes("audit")) {
          await db.collection(col.name).drop();
          console.log(`Dropped collection ${col.name}`);
        }
      }
    } catch(e) {}

    console.log("Database cleaned successfully.");
  } catch (error) {
    console.error("Cleanup Error:", error);
  } finally {
    mongoose.disconnect();
  }
}
clean();

