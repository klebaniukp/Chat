import React from 'react';

export const AuthSwitchButton = (props: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
    isSignIn: boolean;
}) => {
    return (
        <button
            type='button'
            className='btn btn-link m-3'
            onClick={() => props.setIsSignIn(!props.isSignIn)}>
            {props.value}
        </button>
    );
};
