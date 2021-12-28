import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ISearchedUser, IUserData } from '../types/types';
import { SearchFriendModel } from '../components/molecules/SearchFriendModel';
import profile from '../img/profilePicture.png';

export const SearchUser = () => {
    const searchResults: ISearchedUser[] = useSelector(
        (state: RootState) => state.searchResults,
    );

    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const [isFriend, setIsFriend] = useState(false);

    const isUserFriend = (id: string) => {
        const userFriendList = userData.friends;
        // setIsFriend(!isFriend);
    };

    return (
        <div
            className='d-flex flex-wrap flex-column justify-content-center align-item-center m-auto '
            style={{ width: '100vw' }}>
            {searchResults.map(user => (
                <div
                    key={user._id}
                    className='d-flex flex-row justify-content-center'>
                    <SearchFriendModel
                        img={profile}
                        width={'49.5'}
                        height={'10'}
                        imgHeight={'6'}
                        firstname={user.name}
                        lastname={user.lastName}
                        email={user.email}
                        userId={user._id}
                    />
                </div>
            ))}
        </div>
    );
};
