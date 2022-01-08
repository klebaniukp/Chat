import React, { useEffect } from 'react';
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

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const generatingSearchResults = () => {
        const jsxToReturn: JSX.Element[] = [];
        for (let i = 0; i < searchResults.length; i++) {
            const jsxElement = (
                <div key={searchResults[i]._id}>
                    <div className='d-flex flex-row justify-content-center'>
                        <SearchFriendModel
                            img={profile}
                            width={'50'}
                            height={'10'}
                            imgHeight={'6'}
                            firstname={searchResults[i].name}
                            lastname={searchResults[i].lastName}
                            email={searchResults[i].email}
                            isFriend={searchResults[i].friendRequestStatus}
                            id={searchResults[i]._id}
                            index={i}
                        />
                    </div>
                </div>
            );

            jsxToReturn.push(jsxElement);
        }

        scrollToTop();
        return jsxToReturn;
    };

    return (
        <div
            className='d-flex flex-wrap flex-column justify-content-center align-item-center m-auto'
            style={{ width: '100vw' }}>
            {generatingSearchResults()}
        </div>
    );
};
