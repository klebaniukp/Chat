import React, { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Submit } from '../atoms/Button/Submit';
import { ShowPassword } from '../molecules/ShowPassword';
import { Card } from '../atoms/Box/Card';
import { AuthSwitchButton } from '../atoms/Button/AuthSwitchButton';

export const SignIn = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={() => console.log('Submit')}>
            <div
                className={`position-absolute w-75 d-flex align-items-center 
                justify-content-center card border-2 bg-light `}
                style={{
                    fontSize: 'large',
                    left: '50%',
                    top: '45%',
                    transform: 'translate(-50%, -50%)',
                }}>
                <Card value={'Login'} />
                <FormField inputType={'email'} value={'Email address'} />
                <FormField inputType={'text'} value={'Name'} />
                <FormField inputType={'text'} value={'Last Name'} />
                {showPassword ? (
                    <FormField inputType={'text'} value={'Password'} />
                ) : (
                    <FormField inputType={'password'} value={'Password'} />
                )}
                <div onClick={() => setShowPassword(!showPassword)}>
                    <ShowPassword value={'Show password'} />
                </div>
                <Submit value={'Submit'} />
                <p>Don't have an account yet? Click the button down below</p>
                <div
                    onClick={() => {
                        setIsSignIn(false);
                    }}>
                    <AuthSwitchButton value={value} />
                </div>
            </div>
        </form>
    );
};
