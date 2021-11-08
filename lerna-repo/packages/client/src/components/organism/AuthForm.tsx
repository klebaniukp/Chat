import React from 'react';
import { FormField } from '../molecules/FormField';
import { Submit } from '../atoms/Button/Submit';
import { ShowPassword } from '../molecules/ShowPassword';

export const AuthForm = () => {
    return (
        <>
            <div className={'card-title'} style={{ fontSize: 'xxx-large' }}>
                Login
            </div>
            <FormField inputType={'email'} value={'Email address'} />
            <FormField inputType={'text'} value={'Name'} />
            <FormField inputType={'text'} value={'Last Name'} />
            <FormField inputType={'password'} value={'Password'} />
            <ShowPassword value={'Show password'} />
            <Submit value={'Submit'} />
        </>
    );
};

export const signin = () => {
    return (
        <>
            <div className={'card-title'} style={{ fontSize: 'xxx-large' }}>
                Login
            </div>
            <FormField inputType={'email'} value={'Email address'} />
            <FormField inputType={'text'} value={'Name'} />
            <FormField inputType={'text'} value={'Last Name'} />
            <FormField inputType={'password'} value={'Password'} />
            <ShowPassword value={'Show password'} />
            <Submit value={'Submit'} />
            <p>Don't have an account yet? Click the button down below</p>
        </>
    );
};

export const signup = () => {
    return (
        <>
            <div className={'card-title'} style={{ fontSize: 'xxx-large' }}>
                Register
            </div>
            <FormField inputType={'email'} value={'Email address'} />
            <FormField inputType={'text'} value={'Name'} />
            <FormField inputType={'text'} value={'Last Name'} />
            <FormField inputType={'password'} value={'Password'} />
            <FormField inputType={'password'} value={'Repeat Password'} />
            <ShowPassword value={'Show password'} />
            <Submit value={'Submit'} />
            <p>Already have an account? Click the button down below</p>
        </>
    );
};
