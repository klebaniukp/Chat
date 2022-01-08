import React from 'react';
import { DropdownButton } from '../atoms/Button/DropdownButton';
import { NavbarTitle as Title } from '../atoms/Navbar/NavbarTitle';
import { DropdownList } from '../molecules/Navbar/DropdownList';
import { UserInfo } from '../molecules/Navbar/UserInfo';
import { SearchUser } from '../molecules/Navbar/SearchUser';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IUserData } from '../../types/types';
import { Logout } from '../molecules/Navbar/Logout';

export const Navbar = () => {
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    // const authStatus: boolean = useSelector(
    //     (state: RootState) => state.authStatus,
    // );

    return (
        <nav
            className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-1'
            style={{ height: '10vh' }}>
            <div className='container-fluid'>
                <Title value={'Klebaniukp Chat'} />
                <DropdownButton />
                <DropdownList />
                <SearchUser />
                {userData.isUserLoggedIn ? (
                    (console.log(userData),
                    (
                        <>
                            <UserInfo email={userData.email} />
                            <Logout />
                        </>
                    ))
                ) : (
                    <>
                        <UserInfo email={'john@doe.com'} />
                        <Logout />r
                    </>
                )}
            </div>
        </nav>
    );
};
