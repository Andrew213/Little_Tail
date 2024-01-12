import { Schema, model } from 'mongoose';

export const SpecSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
});

export default model('Spec', SpecSchema);
