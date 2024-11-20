const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());

let db;

// MongoDB 연결
MongoClient.connect('mongodb+srv://zstep2014:meliodas7!@testserver1.5vm8d.mongodb.net/?retryWrites=true&w=majority&appName=testserver1', { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }
    db = client.db('test1');
    console.log('Connected to MongoDB');

    // 서버 시작
    app.listen(8080, () => {
        console.log('Server is running on http://localhost:8080');
    });
});

// 데이터 저장 API
app.post('/api/save', (req, res) => {
    const data = req.body;

    db.collection('tests1').insertOne(data, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to save data.');
        } else {
            console.log('Data saved:', result.ops);
            res.status(200).send('Data saved successfully.');
        }
    });
});
