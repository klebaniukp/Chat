import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ISearchedUser } from '../types/types';
import { FriendListModel } from '../components/molecules/FriendListModel';
import profile from '../img/profilePicture.png';
import { profileEnd } from 'console';

export const SearchUser = () => {
    const searchResults: ISearchedUser[] = useSelector(
        (state: RootState) => state.searchResults,
    );

    return (
        <div
            className='d-flex flex-wrap justify-content-center align-item-center m-auto '
            style={{ width: '100vw' }}>
            {searchResults.map(user => (
                <div key={user.id} className='m-2 w-50'>
                    <FriendListModel
                        firstname={user.name}
                        lastname={user.lastName}
                        email={user.email}
                        img={profile}
                        imgHeight={'3'}
                    />
                </div>
            ))}
        </div>
    );
};
