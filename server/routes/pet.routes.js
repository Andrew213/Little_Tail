/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import auth from '../middleware/auth.js';
import PetsController from '../controllers/PetsController.js';

const router = express.Router();

router.post('', auth, PetsController.createPet);

router.get('', auth, PetsController.getPets);

router.delete('', auth, PetsController.deletePet);

export default router;
