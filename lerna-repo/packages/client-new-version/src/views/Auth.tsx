import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/actions/getUserData';
import { RootState } from '../redux/store';
import { IUserData } from '../types/types';
import { SignIn } from '../components/organisms/SignIn';
import { SignUp } from '../components/organisms/SignUp';
import { Navbar } from '../components/organisms/Navbar';

export const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div>
            {isSignIn ? (
                <SignIn value={'Register'} setIsSignIn={setIsSignIn} />
            ) : (
                <SignUp value={'Login'} setIsSignIn={setIsSignIn} />
            )}
        </div>
    );
};
