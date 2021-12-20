import React, { useState } from 'react';
import { FormField } from '../molecules/Form/FormField';
import { FormPasswordField } from '../molecules/Form/FormPasswordField';
import { Submit } from '../atoms/Button/Submit';
import { ShowPassword } from '../molecules/Form/ShowPassword';
import { AuthSwitchButton } from '../atoms/Button/AuthSwitchButton';
import { Card } from '../atoms/Box/Card';
// import { signInHandling } from '../../services/singInHandling';
import { useDispatch } from 'react-redux';
import { signIn, getUserData } from '../../api';
import { useHistory } from 'react-router-dom';
import { IUserData } from '../../types/types';

export const SignIn = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const submitting = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const form = document.querySelector('form');
            if (
                form !== null &&
                form.email !== null &&
                form.password !== null
            ) {
                signIn({
                    email: form.email.value.toString(),
                    password: form.password.value.toString(),
                })
                    .then(res => {
                        const userData: IUserData = {
                            id: res.data.result.id,
                            email: res.data.result.email,
                            name: res.data.result.name,
                            lastName: res.data.result.lastName,
                            friends: res.data.result.friends,
                        };

                        dispatch({ type: 'SET_USER_DATA', payload: userData });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const signinhandling = async (email: string, password: string) => {
    //     const dispatch = useDispatch();

    //     try {
    //         signIn({ email: email, password: password })
    //             .then(res => {
    //                 if (res.status === 200) {
    //                     getUserData().then(res => {
    //                         if (res.status === 200) {
    //                             dispatch({
    //                                 type: 'SET_USER_DATA',
    //                                 payload: res.data,
    //                             });
    //                         }
    //                     });
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

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
                    top: '55%',
                    transform: 'translate(-50%, -50%)',
                }}>
                <Card value={'Login'} />

                <FormField
                    inputType={'email'}
                    value={'Email address'}
                    name={'email'}
                />

                {/* <FormPasswordField value={'Password'} name={'password'} /> */}

                {showPassword ? (
                    <FormField
                        value={'Password'}
                        inputType={'text'}
                        name={'password'}
                    />
                ) : (
                    <FormField
                        value={'Password'}
                        inputType={'password'}
                        name={'password'}
                    />
                )}

                <div onClick={() => setShowPassword(!showPassword)}>
                    <ShowPassword value={'Show password'} />
                </div>
                <Submit value={'Submit'} />
                <p>Don't have an account yet? Click the button down below</p>
                <AuthSwitchButton
                    value={value}
                    setIsSignIn={setIsSignIn}
                    isSignIn={true}
                />
            </div>
        </form>
    );
};
