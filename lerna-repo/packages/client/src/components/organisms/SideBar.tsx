import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IFullFriendData } from '../../types/types';
import { ChatFriendModel } from '../molecules/ChatFriendModel';
import profile from '../../img/profilePicture.png';

export const SideBar = () => {
    const friendList: IFullFriendData[] = useSelector(
        (state: RootState) => state.friendList,
    );

    return (
        <div
            className={`border-1 border-end float-start overflow-auto bg-light`}
            style={{ width: '30vw', height: '90vh' }}>
            {friendList.map(friend => {
                if (friend.friendRequestStatus && friend._id)
                    return (
                        <div key={friend._id}>
                            <ChatFriendModel
                                firstname={friend.name}
                                lastname={friend.lastName}
                                email={friend.email}
                                img={profile}
                                imgHeight={'5'}
                                height={'10'}
                                width={'30'}
                                id={friend._id}
                            />
                        </div>
                    );
            })}
        </div>
    );
};
