import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { signUp } from '../../api';
import { FormField } from '../molecules/Form/FormField';
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
    const showPassword: boolean = useSelector(
        (state: RootState) => state.showPassword,
    );
    const history = useHistory();
    const dispatch = useDispatch();

    const signingUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const form: HTMLFormElement = e.currentTarget;
            if (
                form !== null &&
                form.username.value !== null &&
                form.username.value !== '' &&
                form.lastName.value !== null &&
                form.lastName.value !== '' &&
                form.email.value !== null &&
                form.email.value !== '' &&
                form.password.value !== null &&
                form.password.value !== '' &&
                passwordCheck(form)
            ) {
                const id = toast.loading('Please wait...');
                signUp({
                    email: form.email.value.toString(),
                    name: form.username.value.toString(),
                    lastName: form.lastName.value.toString(),
                    password: form.password.value.toString(),
                })
                    .then(res => {
                        if (res.status === 200) {
                            const userData: IUserData = {
                                id: res.data.result._id,
                                email: res.data.result.email,
                                name: res.data.result.name,
                                lastName: res.data.result.lastName,
                                friends: res.data.result.friends,
                                isUserLoggedIn: true,
                            };
                            dispatch({
                                type: 'SET_USER_DATA',
                                payload: userData,
                            });
                            dispatch({
                                type: 'SET_IS_LOGGED_IN',
                                payload: true,
                            });

                            toast.dismiss();
                            history.push('/chat');
                        }
                    })
                    .catch(err => {
                        toast.update(id, {
                            render: `Invalid password, password must contain 8 characters,
                            1 special sign and 1 capital letter`,
                            type: 'info',
                            isLoading: false,
                        });
                        console.log(err);
                    });
            } else {
                toast.warning('Fill all the fields correctly', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const passwordCheck = (form: HTMLFormElement) => {
        const password = form.password.value;
        const repeatedPassword = form.confirmPassword.value;

        if (password == repeatedPassword) return true;

        toast.error('Passwords must match', {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
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

                {showPassword ? (
                    <>
                        <FormField
                            value={'Password'}
                            inputType={'text'}
                            name={'password'}
                        />
                        <FormField
                            value={'Repeat Password'}
                            inputType={'text'}
                            name={'confirmPassword'}
                        />
                    </>
                ) : (
                    <>
                        <FormField
                            value={'Password'}
                            inputType={'password'}
                            name={'password'}
                        />
                        <FormField
                            value={'Repeat Password'}
                            inputType={'password'}
                            name={'confirmPassword'}
                        />
                    </>
                )}

                <ShowPassword value={'Show password'} />
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
