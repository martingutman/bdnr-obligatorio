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
    res.send(result.rows);
})

app.post('/', async (req, res) => {
    const query = "INSERT INTO VehicleObservation (id, time, observation, value) VALUES (1, dateof(now()), 'Temp', 27.4)";
    const result = await client.execute(query);
    res.send(result);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
