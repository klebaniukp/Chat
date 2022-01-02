import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { generateFriendList } from '../../api';
import { IFullFriendData } from '../../types/types';
import { FriendListModel } from '../molecules/FriendListModel';
import profile from '../../img/profilePicture.png';

export const UserFriendListDisplay = () => {
    let i = 1;
    const friendList: IFullFriendData[] = useSelector(
        (state: RootState) => state.fulfilledFriendList,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        generateFriendList()
            .then(response => {
                console.log(`friendlist: ${JSON.stringify(response.data)}`);
                const friendList: IFullFriendData[] = response.data.friendList;
                dispatch({
                    type: 'SET_FULFILLED_FRIENDLIST',
                    payload: friendList,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [i]);

    return (
        <>
            {friendList.map(friend => {
                return (
                    <>
                        <FriendListModel
                            firstname={friend.name}
                            lastname={friend.lastName}
                            email={friend.email}
                            img={profile}
                            imgHeight={'3'}
                        />
                    </>
                );
            })}
        </>
    );
};
