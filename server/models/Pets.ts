import { Schema, model } from 'mongoose';

const PetsSchema = new Schema({
    age: { type: Number, required: true },
    height: { type: Number },
    heightUnit: { type: String },
    name: { type: String, required: true },
    weight: { type: Number },
    weightUnit: { type: String },
    spec: { type: Schema.Types.Mixed },
});

export default model('Pet', PetsSchema);
