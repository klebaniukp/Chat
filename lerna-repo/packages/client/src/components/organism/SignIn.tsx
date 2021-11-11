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
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const initialState = {
        email: '',
        name: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    };
    const [form, setForm] = useState(initialState);

    const handleSubmit = (e: React.SyntheticEvent) => {
        const form = document.querySelector('form');
        e.preventDefault();
        if (form != null) {
            console.log('clearing');
            setForm(initialState);
            e.preventDefault();
            const formData = new FormData(form);
            formData.append('email', form.email.value);
            formData.append('password', form.password.value);
            formData.append('name', form.username.value);
            console.log(formData);
            console.log(
                `email:${form.email.value},password:${form.password.value},name:${form.username.value}`,
            );
        }
    };

    return (
        <form
            onSubmit={e => {
                handleSubmit(e);
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
                <Card value={'Login'} />

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
                {showPassword ? (
                    <FormField
                        inputType={'text'}
                        value={'Password'}
                        name={'password'}
                    />
                ) : (
                    <FormField
                        inputType={'password'}
                        value={'Password'}
                        name={'password'}
                    />
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
