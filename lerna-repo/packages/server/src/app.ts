import express from 'express';
import { userRouter } from './routes/user';

const app = express();
const port = 5000;

app.use(express.json({ limit: '30mb' }));

app.use('/user', userRouter);
// app.use('/', userRouter);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
