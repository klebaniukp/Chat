import { Document } from 'mongoose';
import { IUserFriend } from '../types/types';

export interface IUser extends Document {
    email: string;
    name: string;
    lastName: string;
    password: string;
    friends: IUserFriend[];
}
