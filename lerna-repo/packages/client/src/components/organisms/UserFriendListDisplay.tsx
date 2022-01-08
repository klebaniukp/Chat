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
        (state: RootState) => state.friendList,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        generateFriendList()
            .then(response => {
                if (response.status === 200) {
                    const friendList: IFullFriendData[] =
                        response.data.friendList;

                    if (friendList.length > 0) {
                        dispatch({
                            type: 'SET_FULFILLED_FRIENDLIST',
                            payload: friendList,
                        });
                    } else {
                        dispatch({
                            type: 'SET_FULFILLED_FRIENDLIST',
                            payload: [],
                        });
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [i]);

    return (
        <>
            {/* {friendList.map(friend => {
                return (
                    <div key={friend.email}>
                        <FriendListModel
                            firstname={friend.name}
                            lastname={friend.lastName}
                            email={friend.email}
                            img={profile}
                            imgHeight={''}
                        />
                    </div>
                );
            })} */}
        </>
    );
};
