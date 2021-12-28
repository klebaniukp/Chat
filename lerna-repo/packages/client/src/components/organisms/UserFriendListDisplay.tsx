import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { generateFriendList } from '../../api';
import {
    IUserData,
    IFriend,
    IFullFriendData,
    IReducedFriend,
} from '../../types/types';
import { FriendListModel } from '../molecules/FriendListModel';
import profile from '../../img/profilePicture.png';

export const UserFriendListDisplay = () => {
    let i = 1;
    const user: IUserData = useSelector((state: RootState) => state.userData);
    const userFriendList: IFriend[] = user.friends;

    const formattedFriendList: IReducedFriend[] = [];
    const fullfilledFriendList: IFullFriendData[] = [];

    useEffect(() => {
        try {
            console.log(userFriendList);

            userFriendList.map((friend: IReducedFriend) => {
                // delete (friend as IReducedFriend).password;
                delete friend.password;
                formattedFriendList.push(friend);
            });

            generateFriendList({ friendList: formattedFriendList })
                .then(response => {
                    console.log(`friendlist: ${JSON.stringify(response.data)}`);
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }, [i]);

    return (
        <>
            {fullfilledFriendList.map(friend => {
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
