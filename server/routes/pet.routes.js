/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import Pets from '../models/Pets.js';
import Specs from '../models/Specs.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/pets', auth, async (req, res) => {
    try {
        const data = req.body;

        const { specId } = data;
        const spec = await Specs.findOne({ id: specId });
        const petSchema = new Pets({ ...data, spec });
        await petSchema.save();

        return res.json({ message: 'Питомец добавлен' });

        // if (Array.isArray(pets)) {
        //     for (const pet of pets) {
        //         const { specId } = pet;
        //         const spec = await Specs.findOne({ id: specId });

        //         const petSchema = new Pets({ ...pet, spec });
        //         await petSchema.save();
        //     }
        // }
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error' });
    }
});

router.get('/pets', auth, async (req, res) => {
    try {
        const { limit, pageNumber, allData } = req.query;
        const total = await Pets.countDocuments();

        if (!+allData) {
            const skip = (+pageNumber - 1) * +limit;

            const pets = await Pets.find({}).limit(+limit).skip(skip);

            return res.json({ pets, total });
        } else {
            const pets = await Pets.find({});

            return res.json({ pets, total });
        }
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error' });
    }
});

router.delete('/pets', auth, async (req, res) => {
    try {
        const { id } = req.body;

        await Pets.findByIdAndDelete(id);

        res.send({ status: 'ok' });
    } catch (error) {
        console.log(`error `, error);
        res.send({ message: 'server error', error, status: 'error' });
    }
});

export default router;
