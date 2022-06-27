const express = require("express");
const cassandra = require('cassandra-driver');
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;

const client = new cassandra.Client({
    contactPoints: [process.env.CONTACT_POINT],
    localDataCenter: process.env.LOCAL_DATA_CENTER,
    keyspace: process.env.KEY_SPACE
});

const app = express();
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
    const query = 'SELECT * FROM vehicleobservation';
    const result = await client.execute(query);
    return res.send(result.rows);
})

app.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        if(!body.id || !body.time || !body.observation || !body.value) {
            return res.status(400).send('The given data was invalid');
        }
        const query = `INSERT INTO VehicleObservation (id, time, observation, value) 
            VALUES (${body.id}, '${body.time}', '${body.observation}', ${body.value})`;
        const result = await client.execute(query);
        return res.send('The value was inserted correctly');
    } catch (err) {
        return res.status(400).send(err);
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
