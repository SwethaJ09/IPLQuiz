const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";
const dbName = "quiz";
async function connect() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        console.log('out with error');
    throw error;
} 
}
module.exports = { connect };