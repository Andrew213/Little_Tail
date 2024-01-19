import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
});

export default model('User', UserSchema);
