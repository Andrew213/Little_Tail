/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import TodaySchema from '../models/Today.js';
import Pets from '../models/Pets.js';
import Therapy from '../models/Therapy.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/today', async (req, res) => {
    try {
        const { petId, dateTime, therapyId } = req.body;

        console.log(` req.body `, req.body);

        const pet = await Pets.findById(petId);
        const therapy = await Therapy.findById(therapyId);

        const todaySchema = new TodaySchema({ pet, therapy, dateTime });
        await todaySchema.save();
        return res.json({ message: 'Appointment was saved', ok: true });
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error', ok: false });
    }
});

router.get('/today', auth, async (req, res) => {
    try {
        const { limit, pageNumber } = req.query;

        const skip = (+pageNumber - 1) * +limit;

        const therapiesList = await TodaySchema.find({}).limit(+limit).skip(skip);

        return res.json(therapiesList);
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error', error });
    }
});

router.delete('/today', auth, async (req, res) => {
    try {
        const { id } = req.body;

        await TodaySchema.findByIdAndDelete(id);

        res.send({ status: 'ok' });
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error', error, status: 'error' });
    }
});

export default router;
