/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import TherapySchema from '../models/Therapy.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/therapy', async (req, res) => {
    try {
        const therapyArr = req.body;

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

router.get('/therapy', auth, async (req, res) => {
    try {
        const therapies = await TherapySchema.find({});
        return res.json(therapies);
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error' });
    }
});

export default router;
