import { Schema, model } from 'mongoose';

const SpecSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    name: { type: String, require: true, unique: true },
    type: { type: String, require: true },
});

export default model('Spec', SpecSchema);
