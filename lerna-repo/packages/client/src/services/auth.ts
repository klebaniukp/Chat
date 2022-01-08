import { getUserData } from '../api/index';
import { IUserData } from '../types/types';

export const auth = async () => {
    try {
        const res = await getUserData();

        const userData: IUserData = {
            id: res.data._id,
            email: res.data.email,
            name: res.data.name,
            lastName: res.data.lastName,
            friends: res.data.friends,
            isUserLoggedIn: true,
        };

        return userData;
    } catch (err) {
        console.log(err);
    }
};
