import React, { useState } from 'react';
import { SignIn } from '../components/organism/SignIn';
import { SignUp } from '../components/organism/SignUp';
import { Navbar } from '../components/organism/Navbar';

export const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <>
            <Navbar />
            <div className={'bg-secondary'}>
                {isSignIn ? (
                    <SignIn value={'sign up'} setIsSignIn={setIsSignIn} />
                ) : (
                    <SignUp value={'sign in'} setIsSignIn={setIsSignIn} />
                )}
            </div>
        </>
    );
};
