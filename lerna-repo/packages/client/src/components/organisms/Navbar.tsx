import React, { useState } from 'react';
import { DropdownButton } from '../atoms/Button/DropdownButton';
import { NavbarTitle as Title } from '../atoms/Navbar/NavbarTitle';
import { DropdownList } from '../molecules/Navbar/DropdownList';
import { UserInfo } from '../molecules/Navbar/UserInfo';
import { SearchUser } from '../molecules/Navbar/SearchUser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IUserData, ISearchedUser } from '../../types/types';

export const Navbar = () => {
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    return (
        <nav
            className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark'
            style={{ height: '10vh' }}>
            <div className='container-fluid'>
                <Title value={'Klebaniukp Chat'} />
                <DropdownButton />
                <DropdownList />
                <SearchUser />
                <UserInfo email={userData.email} />
            </div>
        </nav>
    );
};
