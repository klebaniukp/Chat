import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../api';
import { ButtonNoLink } from '../../atoms/Button/ButtonNoLink';
import { IUserData } from '../../../types/types';

export const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const logoutAction = () => {
        logout().then(() => {
            dispatch({ type: 'LOGOUT' });
            dispatch({ type: 'CLEAR_FULFILLED_FRIENDLIST' });
            dispatch({ type: 'CLEAR_CURRENT_CHAT' });
            dispatch({ type: 'CLEAR_MESSAGE_LIST' });
            history.push('/auth');
        });
    };

    return (
        <>
            {userData.isUserLoggedIn ? (
                <div
                    onClick={() => {
                        logoutAction();
                    }}>
                    <ButtonNoLink value='Logout' type='button' />
                </div>
            ) : (
                <div
                    className='d-none'
                    onClick={() => {
                        logoutAction();
                    }}>
                    <ButtonNoLink value='Logout' type='button' />
                </div>
            )}
        </>
    );
};
