/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import Pets from '../models/Pets.js';
import Specs from '../models/Specs.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/pets', async (req, res) => {
    try {
        const pets = req.body;

        if (Array.isArray(pets)) {
            for (const pet of pets) {
                const { specId } = pet;
                const spec = await Specs.findOne({ id: specId });

                const petSchema = new Pets({ ...pet, spec });
                await petSchema.save();
            }
        }
        return res.json({ message: 'Pets was saved' });
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error' });
    }
});

router.get('/pets', auth, async (req, res) => {
    try {
        const { limit, pageNumber, allData } = req.query;
        if (!+allData) {
            const skip = (+pageNumber - 1) * +limit;

            const pets = await Pets.find({})
                .limit(+limit)
                .skip(skip);

            return res.json(pets);
        } else {
            const pets = await Pets.find({});

            return res.json(pets);
        }
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error' });
    }
});

export default router;
