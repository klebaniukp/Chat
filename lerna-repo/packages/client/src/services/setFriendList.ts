import { generateFriendList } from '../api';
import { IFullFriendData } from '../types/types';

export const setFriendList = async () => {
    const res = await generateFriendList();
    const friendList: IFullFriendData[] = res.data.friendList;

    return friendList;
};
