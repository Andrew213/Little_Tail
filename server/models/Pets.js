import { Schema, model } from 'mongoose';
import { SpecSchema } from './Specs.js';

export const PetsSchema = new Schema({
    age: { type: Number, required: true },
    height: { type: Number },
    heightUnit: { type: String },
    name: { type: String, required: true },
    weight: { type: Number },
    weightUnit: { type: String },
    spec: { type: SpecSchema },
});

export default model('Pet', PetsSchema);
