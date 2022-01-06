import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema({
    _id: { type: String, required: false },
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    friends: {
        type: [
            {
                _id: String,
                friendRequestStatus: Boolean,
            },
        ],
        required: true,
    },
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
