import React from 'react';
import { DropdownButton } from '../atoms/Button/DropdownButton';
import { NavbarTitle as Title } from '../atoms/Navbar/NavbarTitle';
import { DropdownList } from '../molecules/DropdownList';
import { userInfo } from 'os';
import { UserInfo } from '../molecules/UserInfo';

export const Navbar = () => {
    return (
        <>
            <nav
                className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark'
                style={{ height: '6 vh' }}>
                <div className='container-fluid'>
                    <Title value={'Klebaniukp Chat'} />
                    <DropdownButton />
                    <DropdownList />
                    <UserInfo email={'admin@gmail.com'} />
                </div>
            </nav>
        </>
    );
};
