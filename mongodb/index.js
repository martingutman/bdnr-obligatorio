const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require("dotenv")

dotenv.config();
if (!process.env.PORT) {
    console.log("no port configured")
    process.exit(1)
}
const port = process.env.PORT;
// Connection URL
const url = process.env.CONNECTION_STRING;
const client = new MongoClient(url);
// Database Name
const dbName = process.env.DB_NAME;
client.connect().then(()=>{
    console.log('Connected successfully to database');
});

const db = client.db(dbName);

const app = express();
app.use(express.json());

app.get('/:collection', async (req, res) => {
    const collection = db.collection(req.params.collection);
    const result = await collection.find({}).toArray();
    res.send(result)
})

app.post('/:collection', async (req, res) => {
    const collection = db.collection(req.params.collection);
    const result = await collection.insertOne(req.body);
    res.send(result)
})

app.delete('/:collection/:id', async (req, res) => {
    const collection = db.collection(req.params.collection);
    const result = await collection.deleteOne({_id:new ObjectId(req.params.id)});
    res.send(result)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
