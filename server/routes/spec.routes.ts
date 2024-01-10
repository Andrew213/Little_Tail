/* eslint-disable @typescript-eslint/no-misused-promises */

import express, { Request, Response } from 'express';
import Specs from '../models/Specs.js';
import { specT } from '../../src/types/PetType';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/require-await
router.post('/spec', async (req: Request, res: Response) => {
    try {
        const specs = req.body;

        if (Array.isArray(specs)) {
            for (const spec of specs) {
                const { id, name, type } = spec as specT;
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

export default router;
