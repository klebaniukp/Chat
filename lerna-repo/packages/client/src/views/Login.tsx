import React from 'react';
import { AuthForm } from '../components/organism/AuthForm';

export const Login = () => {
    return <AuthForm height={'4vh'} formType={'signin'} formMethod={'post'} />;
};
