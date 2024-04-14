/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express';
import Specs from '../models/Specs.js';

const router = express.Router();

router.post('/spec', async (req, res) => {
    try {
        const specs = req.body;

        if (Array.isArray(specs)) {
            for (const spec of specs) {
                const { id, name, type } = spec;
                const newSpec = new Specs({ id, name, type });
                await newSpec.save();
            }
        }

        return res.json({ message: 'Specs was created' });
    } catch (err) {
        console.log(`err `, err);
        res.send({ message: 'server error' });
    }
});

router.get('/spec', async (req, res) => {
    try {
        const specs = await Specs.find({});
        return res.json(specs);
    } catch (error) {
        console.log(`err `, error);
        res.send({ message: 'server error' });
    }
});

export default router;
