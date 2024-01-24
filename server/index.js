/* eslint-disable no-undef */
import express from 'express';
import authRouter from './routes/auth.routes.js';
import specRouter from './routes/spec.routes.js';
import petRouter from './routes/pet.routes.js';
import therapyRouter from './routes/therapy.routes.js';
import todayRouter from './routes/today.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 8800;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/spec', specRouter);
app.use('/api/pets', petRouter);
app.use('/api/therapy', therapyRouter);
app.use('/api/today', todayRouter);

mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => {
        console.log('MongoDB is Connected..');
    })
    .catch(err => {
        console.log(err.message);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
