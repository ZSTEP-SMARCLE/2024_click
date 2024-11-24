const express = require('express');
const mongodb = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱
app.use(express.static('public')); // 정적 파일 제공

// MongoDB 연결
const mongoUri = 'mongodb+srv://zstep2014:meliodas7!@testserver1.5vm8d.mongodb.net/?retryWrites=true&w=majority&appName=testserver1';
const client = new mongodb.MongoClient(mongoUri);
let db;

client.connect()
    .then(() => {
        db = client.db('test1'); // 사용할 데이터베이스 이름
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error(err));

// 라우팅 설정
app.set('view engine', 'ejs'); // EJS 템플릿 엔진 설정
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, World!' }); // EJS 템플릿 렌더링
});

app.post('/api/save', async (req, res) => {
    try {
        const data = req.body;
        const result = await db.collection('tests1').insertOne(data);
        res.status(200).send('Data saved successfully.');
        console.log('Data saved:', result.ops);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data.');
    }
});

// 서버 시작
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
