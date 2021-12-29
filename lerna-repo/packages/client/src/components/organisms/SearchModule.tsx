import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ISearchedUser } from '../../types/types';
import { FriendListModel } from '../molecules/FriendListModel';
import profile from '../../img/profilePicture.png';

export const SearchModule = () => {
    const searchResult: ISearchedUser[] = useSelector(
        (state: RootState) => state.searchResults,
    );

    return (
        <div
            className='overflow-auto w-50'
            style={{ height: '33vh', width: '50vw' }}>
            {searchResult.map(user => (
                <div key={user._id}>
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
