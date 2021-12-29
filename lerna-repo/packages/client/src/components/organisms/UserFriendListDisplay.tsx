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
                dispatch({
                    type: 'SET_FULLFILLED_FRIEND_DATA',
                    payload: response.data.friendList,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [i]);

    return (
        <>
            {friendList.map(friend => {
                <FriendListModel
                    firstname={friend.name}
                    lastname={friend.lastName}
                    email={friend.email}
                    img={profile}
                    imgHeight={'3'}
                />;
            })}
        </>
    );
};
