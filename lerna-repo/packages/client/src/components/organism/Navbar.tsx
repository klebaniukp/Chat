import React, { useState } from 'react';
import { DropdownButton } from '../atoms/Button/DropdownButton';
import { NavbarTitle as Title } from '../atoms/Navbar/NavbarTitle';
import { DropdownList } from '../molecules/DropdownList';
import { UserInfo } from '../molecules/UserInfo';
import { SearchUser } from '../molecules/SearchUser';
import { authorize } from '../../api';
import { useUserDataContext } from '../../contexts/userDataContext';

export const Navbar = () => {
    const [email, setEmail] = useState('user@example.com');
    const { userData, setUserData } = useUserDataContext();
    console.log(userData);

    return (
        <nav
            className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark'
            style={{ height: '4 vh' }}>
            <div className='container-fluid'>
                <Title value={'Klebaniukp Chat'} />
                <DropdownButton />
                <DropdownList />
                <SearchUser />
                <UserInfo email={userData} />
            </div>
        </nav>
    );
};
