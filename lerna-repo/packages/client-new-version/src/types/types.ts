export interface IFriend {
    id: string;
}

export interface IUserData {
    id: string;
    email: string;
    name: string;
    lastName: string;
    friends: IFriend[] | [];
}
