import React, { useState } from 'react';
import { SignIn, SignUp } from '../components/organism/AuthForm';
import { AuthSwitchButton } from '../components/atoms/Button/AuthSwitchButton';

export const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div className={'bg-secondary'}>
            {isSignIn ? (
                <SignIn value={'sign in'} setIsSignIn={setIsSignIn} />
            ) : (
                <SignUp value={'sign up'} setIsSignIn={setIsSignIn} />
            )}
        </div>
    );
};
