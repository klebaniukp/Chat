import React from 'react';

export const ButtonNoLink = (props: {
    type: 'submit' | 'button';
    value: string;
}) => {
    return (
        <button
            type={props.type}
            className='btn btn-outline-primary m-2 btn-lg vh-5'>
            {props.value}
        </button>
    );
};
