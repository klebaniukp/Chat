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
    _id: string;
    friendRequestStatus: boolean;
}
