const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function wipeData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    const db = mongoose.connection.useDb("nexarch");

    // Clear contact messages
    const contactmessages = db.collection("contactmessages");
    const cmResult = await contactmessages.deleteMany({});
    console.log(`Deleted ${cmResult.deletedCount} documents from contactmessages.`);

    // Clear audit logs
    const audit_logs = db.collection("audit_logs");
    const alResult = await audit_logs.deleteMany({});
    console.log(`Deleted ${alResult.deletedCount} documents from audit_logs.`);

    // Clear services
    const services = db.collection("services");
    const sResult = await services.deleteMany({});
    console.log(`Deleted ${sResult.deletedCount} documents from services.`);

    // Clear analytics page views
    const pageviews = db.collection("pageviews");
    const pvResult = await pageviews.deleteMany({});
    console.log(`Deleted ${pvResult.deletedCount} documents from pageviews.`);

    console.log("All requested test data has been removed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error wiping data:", error);
    process.exit(1);
  }
}

wipeData();
