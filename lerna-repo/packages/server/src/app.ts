import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from './routes/user';

const CONNECTION_URL = process.env.CONNECTION_URL as string;
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// mongoose
//   .connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)),
//   )
//   .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);
