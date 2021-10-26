import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('hello world ch');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
