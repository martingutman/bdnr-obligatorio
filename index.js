const express = require("express");
const cassandra = require('cassandra-driver');
const port = 3000;

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1:9042'],
    localDataCenter: 'datacenter1',
    keyspace: 'bdnr'
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
