const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    const db = mongoose.connection.useDb("nexarch");
    const collection = db.collection("pageviews");
    
    const count = await collection.countDocuments();
    console.log("Total page views:", count);
    
    const docs = await collection.find({}).toArray();
    console.log(docs);
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
