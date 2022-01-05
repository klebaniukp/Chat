import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ISearchedUser, IUserData } from '../types/types';
import { SearchFriendModel } from '../components/molecules/SearchFriendModel';
import { IFriend } from '../types/types';
import profile from '../img/profilePicture.png';

export const SearchUser = () => {
    const searchResults: ISearchedUser[] = useSelector(
        (state: RootState) => state.searchResults,
    );

    return (
        <div
            className='d-flex flex-wrap flex-column justify-content-center align-item-center m-auto '
            style={{ width: '100vw' }}>
            {searchResults.length > 1 ? (
                searchResults.map(
                    user => (
                        console.log(user.friendRequestStatus),
                        (
                            <div key={user._id}>
                                <div className='d-flex flex-row justify-content-center'>
                                    <SearchFriendModel
                                        img={profile}
                                        width={'50'}
                                        height={'10'}
                                        imgHeight={'6'}
                                        firstname={user.name}
                                        lastname={user.lastName}
                                        email={user.email}
                                        isFriend={user.friendRequestStatus}
                                        id={user._id}
                                    />
                                </div>
                            </div>
                        )
                    ),
                )
            ) : (
                <div key={searchResults[0]._id}>
                    {console.log(searchResults[0].friendRequestStatus)}
                    <div className='d-flex flex-row justify-content-center'>
                        <SearchFriendModel
                            img={profile}
                            width={'50'}
                            height={'10'}
                            imgHeight={'8'}
                            firstname={searchResults[0].name}
                            lastname={searchResults[0].lastName}
                            email={searchResults[0].email}
                            isFriend={searchResults[0].friendRequestStatus}
                            id={searchResults[0]._id}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
