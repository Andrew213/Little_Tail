/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult, query } from 'express-validator';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post(
    '/signup',
    [
        check('password', 'Password must be longer than 8 and shorter than 12 symbols').isLength({ min: 8, max: 12 }),
        check('login').notEmpty(),
        check('first_name').notEmpty(),
        check('last_name').notEmpty(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Uncorrect request',
                    errors: errors.array().map(err => ({ field: err.path, msg: err.msg })),
                });
            }

            const { login, password, first_name, last_name } = req.body;

            const candidate = await User.findOne({ login });

            if (candidate) {
                return res.status(400).json({ message: `User with login ${login} alredy exists` });
            }
            const hashPassword = await bcrypt.hash(password, 5);

            const user = new User({ login, password: hashPassword, first_name, last_name });
            const savedUSer = await user.save();

            const token = jwt.sign({ id: savedUSer.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
            });
        } catch (error) {
            console.log(error);
            res.send({ message: 'server error' });
        }
    }
);

router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({ login });

        if (!user) {
            return res.status(404).json({ message: `User not found`, status: 404 });
        }
        const isPassValid = bcrypt.compareSync(password, user.password);

        if (!isPassValid) {
            return res.status(400).json({ message: `Invalid password`, status: 400 });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({ message: 'server error' });
    }
});

router.get('/auth', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: `User not found`, status: 404 });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({ message: 'server error' });
    }
});

export default router;
