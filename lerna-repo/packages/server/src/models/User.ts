import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema({
    id: { type: String },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserModel = model<IUser>('User', userSchema);
