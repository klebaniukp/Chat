import { DropdownButton } from '../atoms/Button/DropdownButton';
import { NavbarTitle as Title } from '../atoms/Navbar/NavbarTitle';
import { DropdownList } from '../molecules/Navbar/DropdownList';
import { UserInfo } from '../molecules/Navbar/UserInfo';
import { SearchUser } from '../molecules/Navbar/SearchUser';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IUserData } from '../../types/types';
import { Logout } from '../molecules/Navbar/Logout';
import logo from '../../img/logo.png';

export const Navbar = () => {
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    return (
        <nav
            className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-0'
            style={{ height: '10vh' }}>
            <div className='container-fluid'>
                {userData.isUserLoggedIn ? (
                    <>
                        <Title value={'Chat'} logo={logo} link={'/chat'} />
                        <DropdownButton />
                        <DropdownList />
                        <SearchUser />
                        <UserInfo email={userData.email} />
                        <Logout />
                    </>
                ) : (
                    <>
                        <Title value={'Chat'} logo={logo} link={'/auth'} />
                        <Logout />
                    </>
                )}
            </div>
        </nav>
    );
};
