import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { manageFriendRequestAPI } from '../../api';
import { FriendListModel } from '../molecules/FriendListModel';
import { generateFriendList } from '../../api';
import { IFullFriendData } from '../../types/types';
import profile from '../../img/profilePicture.png';

export const FriendListManagement = () => {
    const dispatch = useDispatch();

    const friendList: IFullFriendData[] = useSelector(
        (state: RootState) => state.fulfilledFriendList,
    );

    const i = 0;
    useEffect(() => {
        if (
            friendList.length === 0 &&
            friendList[0].senderId === 'not-real-id'
        ) {
            generateFriendList()
                .then((res: any) => {
                    if (res && res.status(200)) {
                        const fulfilledFriendList = res.map(
                            (user: IFullFriendData) => {
                                return {
                                    email: user.email,
                                    name: user.name,
                                    lastName: user.lastName,
                                    friendRequestStatus:
                                        user.friendRequestStatus,
                                    senderId: user.senderId,
                                };
                            },
                        );

                        console.log(fulfilledFriendList);

                        dispatch({
                            type: 'SET_FULFILLED_FRIENDLIST',
                            payload: fulfilledFriendList,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [i]);

    return (
        <div
            className={`d-flex flex-column justify-content 
            center card w-50 h-100 align-items-center overflow-auto m-auto`}>
            <FriendListModel
                firstname={'Example'}
                lastname={'Friend'}
                email={'example@friend'}
                img={profile}
                imgHeight={'6'}
                width={'50'}
                height={'10'}
            />
        </div>
    );
};
