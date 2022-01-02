export interface IResUser {
    _id?: string;
    email: string;
    lastName: string;
    name: string;
    password?: string;
    friends?: IUserFriend[] | [];
}

export interface IFriend {
    email: string;
    name: string;
    lastName: string;
}

export interface IUser {
    _id: string;
    email: string;
    name: string;
    lastName: string;
    password: string;
    friends: IUserFriend[] | [];
}

export interface IUserFriend {
    _id: string;
    friendRequestStatus: boolean;
}

export interface IIdOnlyFriendList {
    _id: string;
}
