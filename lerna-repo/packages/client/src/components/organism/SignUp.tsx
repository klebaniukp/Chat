import React, { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Submit } from '../atoms/Button/Submit';
import { ShowPassword } from '../molecules/ShowPassword';
import { Card } from '../atoms/Box/Card';
import { AuthSwitchButton } from '../atoms/Button/AuthSwitchButton';
import { signUp } from '../../api';
import { sign } from 'crypto';

export const SignUp = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const initialState = {
        email: '',
        name: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    };

    const [form, setForm] = useState(initialState);

    const submitting = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = document.querySelector('form');

        if (form != null && passwordCheck(form)) {
            if (form != null) handleSubmit(e, form);
        } else {
            alert('Passwords do not match');
        }
    };

    const passwordCheck = (form: HTMLFormElement) => {
        const password = form.password.value;
        const repeatedPassword = form.confirmPassword.value;

        if (password == repeatedPassword) return true;

        return false;
    };

    const handleSubmit = (e: React.SyntheticEvent, form: HTMLFormElement) => {
        e.preventDefault();
        if (form != null) {
            // setForm(initialState);
            const email = form.email.value;
            const name = form.username.value;
            const lastName = form.lastName.value;
            const password = form.password.value;
            let formData: JSON = {
                email: email,
                name: name,
                lastName: lastName,
                password: password,
            };
            console.log(
                `email:${form.email.value},password:${form.password.value},name:${form.username.value}`,
            );
            signUp(formData).then(
                res => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                },
            );
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    return (
        <form
            onSubmit={e => {
                submitting(e);
            }}>
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
                <FormField
                    inputType={'email'}
                    value={'Email address'}
                    name={'email'}
                />
                <FormField
                    inputType={'text'}
                    value={'Name'}
                    name={'username'}
                />
                <FormField
                    inputType={'text'}
                    value={'Last Name'}
                    name={'lastName'}
                />
                {showPassword ? (
                    <>
                        <FormField
                            inputType={'text'}
                            value={'Password'}
                            name={'password'}
                        />
                        <FormField
                            inputType={'text'}
                            value={'Repeat Password'}
                            name={'confirmPassword'}
                        />
                    </>
                ) : (
                    <>
                        <FormField
                            inputType={'password'}
                            value={'Password'}
                            name={'password'}
                        />
                        <FormField
                            inputType={'password'}
                            value={'Repeat Password'}
                            name={'confirmPassword'}
                        />
                    </>
                )}
                <div onClick={() => setShowPassword(!showPassword)}>
                    <ShowPassword value={'Show password'} />
                </div>
                <Submit value={'Submit'} />
                <p>Already have an account? Click the button down below</p>
                <div
                    onClick={() => {
                        setIsSignIn(true);
                    }}>
                    <AuthSwitchButton value={value} />
                </div>
            </div>
        </form>
    );
};
