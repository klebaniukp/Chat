import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../api';
import { FormField } from '../molecules/Form/FormField';
import { FormPasswordField } from '../molecules/Form/FormPasswordField';
import { Submit } from '../atoms/Button/Submit';
import { ShowPassword } from '../molecules/Form/ShowPassword';
import { Card } from '../atoms/Box/Card';
import { AuthSwitchButton } from '../atoms/Button/AuthSwitchButton';
import { IUserData } from '../../types/types';

export const SignUp = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const signingUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const form = document.querySelector('form');
            if (
                form !== null &&
                form.username !== null &&
                form.lastName !== null &&
                form.email !== null &&
                form.password !== null &&
                passwordCheck(form)
            ) {
                signUp({
                    email: form.email.value.toString(),
                    name: form.username.value.toString(),
                    lastName: form.lastName.value.toString(),
                    password: form.password.value.toString(),
                })
                    .then(res => {
                        const userData: IUserData = {
                            id: res.data.result._id,
                            email: res.data.result.email,
                            name: res.data.result.name,
                            lastName: res.data.result.lastName,
                            friends: res.data.result.friends,
                        };

                        dispatch({ type: 'SET_USER_DATA', payload: userData });
                        history.push('/chat');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                alert('Fill all the fields correctly');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const passwordCheck = (form: HTMLFormElement) => {
        const password = form.password.value;
        const repeatedPassword = form.confirmPassword.value;

        if (password == repeatedPassword) return true;

        return false;
    };

    return (
        <form
            onSubmit={e => {
                signingUp(e);
            }}>
            <div
                className={`position-absolute w-75 d-flex align-items-center 
                justify-content-center card border-2 bg-light `}
                style={{
                    fontSize: 'large',
                    left: '50%',
                    top: '55%',
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

                <FormPasswordField value={'Password'} name={'password'} />
                <FormPasswordField
                    value={'Repeat Password'}
                    name={'confirmPassword'}
                />

                <div onClick={() => setShowPassword(!showPassword)}>
                    <ShowPassword value={'Show password'} />
                </div>
                <Submit value={'Submit'} />
                <p>Already have an account? Click the button down below</p>
                <AuthSwitchButton
                    value={value}
                    setIsSignIn={setIsSignIn}
                    isSignIn={false}
                />
            </div>
        </form>
    );
};
