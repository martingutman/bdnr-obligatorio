const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');

const port = 3000;

// Connection URL
const url = 'mongodb://docker:mongopw@localhost:49153';
const client = new MongoClient(url);
// Database Name
const dbName = 'bdnr';
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
