import React from 'react';

export const ButtonNoLink = (props: {
    type: 'submit' | 'button';
    value: string;
}) => {
    return (
        <button type={props.type} className='btn btn-outline-primary'>
            {props.value}
        </button>
    );
};
