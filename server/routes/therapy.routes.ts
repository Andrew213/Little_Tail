/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import TherapySchema from '../models/Therapy.js';
import auth from '../middleware/auth.js';
import { TherapyT } from '../../src/types/Therapy.js';

const router = express.Router();

router.post('/therapy', async (req: Request, res: Response) => {
    try {
        const therapyArr = req.body as TherapyT[];

        if (Array.isArray(therapyArr)) {
            for (const therapy of therapyArr) {
                const { id, type } = therapy;

                const therapySchema = new TherapySchema({ id, type });
                await therapySchema.save();
            }
        }

        return res.json({ message: 'therapy was saved' });
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error' });
    }
});

router.get('/therapy', auth, async (req: Request, res: Response) => {
    try {
        const therapies = await TherapySchema.find({});
        return res.json(therapies);
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error' });
    }
});

export default router;
