import { Document } from 'mongoose';

export interface IUser extends Document {
    // id: string;
    email: string;
    name: string;
    lastName: string;
    password: string;
    friends: IFriend[];
}

export interface IFriend {
    lastName: string;
    name: string;
    email: string;
    _id: string;
    friendRequestStatus: boolean;
}
