import { Schema, model } from 'mongoose';
import { PetsSchema } from './Pets.js';
import { TherapySchema } from './Therapy.js';

const TodaySchema = new Schema({
    pet: { type: PetsSchema, required: true },
    dateTime: { type: Number, required: true },
    therapy: { type: TherapySchema, required: true },
});

export default model('Today', TodaySchema);
