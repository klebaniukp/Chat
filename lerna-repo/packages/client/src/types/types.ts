export interface IFriend {
    _id: string;
    friendRequestStatus: boolean;
}

export interface IFullFriendData {
    _id: string;
    email: string;
    name: string;
    lastName: string;
    friendRequestStatus: boolean;
    senderId: string;
}

export interface IUserData {
    id: string;
    email: string;
    name: string;
    lastName: string;
    friends: IFriend[] | [];
    isUserLoggedIn: boolean;
}

export interface ISearchedUser {
    _id: string;
    email: string;
    name: string;
    lastName: string;
    friendRequestStatus: null | boolean;
}

export interface IReducedFriend {
    _id: string;
    password?: string;
}
