import React from 'react';
import styled from 'styled-components';
import { AuthForm, signin, signup } from '../components/organism/AuthForm';

export const Login = () => {
    return (
        <div className={'bg-secondary'}>
            <AuthForm />
        </div>
    );
};
