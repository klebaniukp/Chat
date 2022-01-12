import { generateFriendList } from '../api';
import { IFullFriendData } from '../types/types';

export const setFriendList = async () => {
    const res = await generateFriendList();

    if (res.status === 200) {
        const friendList: IFullFriendData[] = res.data.friendList;

        return friendList;
    }
};
