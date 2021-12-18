import React, { useState } from 'react';
import { DropdownButton } from '../atoms/Button/DropdownButton';
import { NavbarTitle as Title } from '../atoms/Navbar/NavbarTitle';
import { DropdownList } from '../molecules/DropdownList';
import { UserInfo } from '../molecules/UserInfo';
import { SearchUser } from '../molecules/SearchUser';

export const Navbar = () => {
    return (
        <nav
            className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark'
            style={{ height: '10vh' }}>
            <div className='container-fluid'>
                <Title value={'Klebaniukp Chat'} />
                <DropdownButton />
                <DropdownList />
                <SearchUser />
                <UserInfo email={'mekfn'} />
            </div>
        </nav>
    );
};

// <nav
//     className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark'
//     style={{ height: '4 vh' }}>
//     <div className='container-fluid'>
//         <Title value={'Klebaniukp Chat'} />
//         <DropdownButton />
//         <DropdownList />
//         <SearchUser />
//         <UserInfo email={email} />
//     </div>
// </nav>
