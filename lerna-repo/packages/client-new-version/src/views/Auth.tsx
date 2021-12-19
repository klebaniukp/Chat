import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/actions/getUserData';
import { RootState } from '../redux/store';
import { IUserData } from '../types/types';

export const Auth = () => {
    const dispatch = useDispatch();
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    return (
        <div>
            <div>Auth</div>
            {/* <div>email: {userData.email}, name: {userData.name}</div> */}
            {/* working ^ :) */}
        </div>
    );
};
