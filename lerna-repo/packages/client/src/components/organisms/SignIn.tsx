import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { signIn } from '../../api';
import { setFriendList } from '../../services/setFriendList';
import { FormField } from '../molecules/Form/FormField';
import { Submit } from '../atoms/Button/Submit';
import { ShowPassword } from '../molecules/Form/ShowPassword';
import { AuthSwitchButton } from '../atoms/Button/AuthSwitchButton';
import { Card } from '../atoms/Box/Card';
import { useHistory } from 'react-router-dom';
import { IUserData } from '../../types/types';

export const SignIn = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const showPassword: boolean = useSelector(
        (state: RootState) => state.showPassword,
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const signingIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const form: HTMLFormElement = e.currentTarget;
            if (
                form !== null &&
                form.email.value !== null &&
                form.email.value !== '' &&
                form.password.value !== null &&
                form.password.value !== ''
            ) {
                const id = toast.loading('Please wait...');
                signIn({
                    email: form.email.value.toString(),
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

                            setFriendList().then(friendList => {
                                dispatch({
                                    type: 'SET_FULFILLED_FRIENDLIST',
                                    payload: friendList,
                                });
                            });

                            toast.dismiss();
                            history.push('/chat');
                        }
                    })
                    .catch(err => {
                        toast.update(id, {
                            render: `Invalid password`,
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

    return (
        <form
            id='signInForm'
            onSubmit={e => {
                signingIn(e);
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

                <ShowPassword value={'Show password'} />
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
