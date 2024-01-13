import { Schema, model } from 'mongoose';

export const TherapySchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    type: { type: String, required: true, unique: true },
});

export default model('Therapy', TherapySchema);
