import React from 'react';
import { FormField } from '../molecules/FormField';
import { Submit } from '../atoms/Button/Submit';
import { ShowPassword } from '../molecules/ShowPassword';
import { Card } from '../atoms/Box/Card';
import { AuthSwitchButton } from '../atoms/Button/AuthSwitchButton';

const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export const SignIn = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: any;
}) => {
    return (
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
            <FormField inputType={'password'} value={'Password'} />
            <ShowPassword value={'Show password'} />
            <Submit value={'Submit'} />
            <p>Don't have an account yet? Click the button down below</p>
            <div
                onClick={() => {
                    setIsSignIn(false);
                }}>
                <AuthSwitchButton value={value} />
            </div>
        </div>
    );
};

export const SignUp = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: any;
}) => {
    return (
        <div
            className={`position-absolute w-75 d-flex align-items-center 
                justify-content-center card border-2 bg-light `}
            style={{
                fontSize: 'large',
                left: '50%',
                top: '45%',
                transform: 'translate(-50%, -50%)',
            }}>
            <Card value={'Register'} />
            <FormField inputType={'email'} value={'Email address'} />
            <FormField inputType={'text'} value={'Name'} />
            <FormField inputType={'text'} value={'Last Name'} />
            <FormField inputType={'password'} value={'Password'} />
            <FormField inputType={'password'} value={'Repeat Password'} />
            <ShowPassword value={'Show password'} />
            <Submit value={'Submit'} />
            <p>Already have an account? Click the button down below</p>
            <div
                onClick={() => {
                    setIsSignIn(true);
                }}>
                <AuthSwitchButton value={value} />
            </div>
        </div>
    );
};
