import { generateFriendList } from '../api';
import { useDispatch } from 'react-redux';
import { IFullFriendData } from '../types/types';

export const setFriendList = (i: number) => {
    if (i !== 0) return 1;
    try {
        const dispatch = useDispatch();

        generateFriendList()
            .then((res: any) => {
                if (res.length >= 1 && res.status === 200) {
                    const fulfilledFriendList = res.map(
                        (user: IFullFriendData) => {
                            return {
                                email: user.email,
                                name: user.name,
                                lastName: user.lastName,
                                friendRequestStatus: user.friendRequestStatus,
                                senderId: user.senderId,
                            };
                        },
                    );

                    dispatch({
                        type: 'SET_FULFILLED_FRIENDLIST',
                        payload: fulfilledFriendList,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    } catch (err) {
        console.log(err);
    }
};
