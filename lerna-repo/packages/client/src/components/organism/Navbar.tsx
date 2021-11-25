import React, { useState } from 'react';
import { DropdownButton } from '../atoms/Button/DropdownButton';
import { NavbarTitle as Title } from '../atoms/Navbar/NavbarTitle';
import { DropdownList } from '../molecules/DropdownList';
import { UserInfo } from '../molecules/UserInfo';
import { SearchUser } from '../molecules/SearchUser';
import { authorize } from '../../api';

export const Navbar = () => {
    const [email, setEmail] = useState('user@example.com');

    const result = authorize();

    result
        .then(res => {
            const userData = res.data;
            setEmail(userData.email);
        })
        .catch(err => {
            console.log(err);
        });

    return (
        <>
            <nav
                className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark'
                style={{ height: '4 vh' }}>
                <div className='container-fluid'>
                    <div>
                        <Title value={'Klebaniukp Chat'} />
                    </div>
                    <DropdownButton />
                    <DropdownList />
                    <SearchUser />
                    <UserInfo email={email} />
                </div>
            </nav>
        </>
    );
};
