import React from 'react';
import { AuthSwitchButton } from '../atoms/Button/AuthSwitchButton';

export const SignInUpSwitch = (props: { value: string }) => {
    return (
        <div>
            <AuthSwitchButton value={props.value} />
        </div>
    );
};