import express from 'express';
import authRouter from './routes/auth.routes.js';
import specRouter from './routes/spec.routes.js';
import petRouter from './routes/pet.routes.js';
import config from 'config';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
const PORT = config.get('serverPort');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', specRouter);
app.use('/api', petRouter);

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'));

        app.listen(PORT, () => {
            console.log('server started on ', PORT);
        });
    } catch (e) {
        console.log(`error `, e);
    }
};

void start();
