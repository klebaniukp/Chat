import React, { useState } from 'react';
import { FormField } from '../molecules/Form/FormField';
import { Submit } from '../atoms/Button/Submit';
import { ShowPassword } from '../molecules/Form/ShowPassword';
import { AuthSwitchButton } from '../atoms/Button/AuthSwitchButton';
import { Card } from '../atoms/Box/Card';
import { produceWithPatches } from 'immer';

export const SignIn = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form
        // onSubmit={e => {
        //     submitting(e);
        // }}
        >
            <div
                className={`position-absolute w-75 d-flex align-items-center 
                justify-content-center card border-2 bg-light `}
                style={{
                    fontSize: 'large',
                    left: '50%',
                    top: '55%',
                    transform: 'translate(-50%, -50%)',
                }}>
                {/* <Card value={'Login'} /> */}
                {/* header todo */}

                <Card value={'Login'} />

                <FormField
                    inputType={'email'}
                    value={'Email address'}
                    name={'email'}
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
                    style={{ margin: 0, padding: 0 }}
                    onClick={() => {
                        setIsSignIn(false);
                    }}>
                    <AuthSwitchButton value={value} />
                </div>
            </div>
        </form>
    );
};
