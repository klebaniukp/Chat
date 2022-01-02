import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../api';
import { ButtonNoLink } from '../../atoms/Button/ButtonNoLink';

export const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const authStatus = useSelector((state: RootState) => state.authStatus);

    const logoutAction = () => {
        logout().then(() => {
            dispatch({ type: 'SET_IS_LOGGED_IN', payload: false });
            dispatch({ type: 'CLEAR_FULFILLED_FRIENDLIST' });
            history.push('/auth');
        });
    };

    return (
        <>
            {authStatus ? (
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
