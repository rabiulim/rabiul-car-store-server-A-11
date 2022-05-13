const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());

// user: dbassignment11
// password: h9dzyeKePjhWjTkX



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterassignment11.rnknz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {

        await client.connect();
        const carCollection = client.db('Car-Store').collection('cars');

        app.get('/car', async (req, res) => {
            const query = {};
            const cursor = carCollection.find(query);
            const cars = await cursor.toArray();
            res.send(cars);

        })

        app.post('/car', async (req, res) => {
            const newCar = req.body;
            console.log('adding new car')
            const result = await carCollection.insertOne(newCar);
            res.send(result)
        })
        // app.get('/cars/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await carCollection.findOne(query);
        //     res.send(result);
        // });

        app.delete('/car/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await carCollection.deleteOne(query);
            res.send(result);
        });
    }

    finally {

    }

}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Runnign fullstack Servrer')
});

app.listen(port, () => {
    console.log('fullstack server running')
})
