/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import auth from '../middleware/auth.js';
import TodayController from '../controllers/TodayController.js';

const router = express.Router();

router.post('', auth, TodayController.createToday);

router.get('', auth, TodayController.getToaday);

router.delete('', auth, TodayController.deletePet);

export default router;
