export interface IFriend {
    _id: string;
    friendRequestStatus: boolean;
}

export interface IFullFriendData {
    email: string;
    name: string;
    lastName: string;
}

export interface IUserData {
    id: string;
    email: string;
    name: string;
    lastName: string;
    friends: IFriend[] | [];
}

export interface ISearchedUser {
    _id: string;
    email: string;
    name: string;
    lastName: string;
}

export interface IReducedFriend {
    _id: string;
    password?: string;
}
