import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FriendListModel } from '../molecules/FriendListModel';
import { IUserData, IFullFriendData } from '../../types/types';
import profile from '../../img/profilePicture.png';

export const FriendListManagement = () => {
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const friendList: IFullFriendData[] = useSelector(
        (state: RootState) => state.friendList,
    );

    return (
        <div
            className={`d-flex flex-column justify-content 
            center card w-50 h-100 align-items-center overflow-auto m-auto`}>
            {friendList.map(friend => {
                return (
                    <div key={friend.email}>
                        <FriendListModel
                            firstname={friend.name}
                            lastname={friend.lastName}
                            email={friend.email}
                            img={profile}
                            imgHeight={'6'}
                            width={'50'}
                            height={'10'}
                            isUserSender={friend.senderId === userData.id}
                            friendRequestStatus={friend.friendRequestStatus}
                            id={friend._id}
                        />
                    </div>
                );
            })}
        </div>
    );
};
