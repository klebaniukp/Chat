import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    friends: {
        type: [
            {
                _id: String,
                friendRequestStatus: String,
            },
        ],
        required: false,
    },
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
