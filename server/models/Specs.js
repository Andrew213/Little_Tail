import { Schema, model } from 'mongoose';

export const SpecSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
});

export default model('Spec', SpecSchema);
