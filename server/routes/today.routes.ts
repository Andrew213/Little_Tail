/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import TodaySchema from '../models/Today.js';
import Pets from '../models/Pets.js';
import Therapy from '../models/Therapy.js';

const router = express.Router();

export type TODAY_POST_DATA = {
    petId: string;
    dateTime: Date;
    therapyId: string;
};

router.post('/today', async (req: Request, res: Response) => {
    try {
        const { petId, dateTime, therapyId } = req.body as TODAY_POST_DATA;

        const pet = await Pets.findById(petId);
        const therapy = await Therapy.findById(therapyId);

        const todaySchema = new TodaySchema({ pet, therapy, dateTime });
        await todaySchema.save();
        return res.json({ message: 'Appointment was saved' });
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error' });
    }
});

export default router;
