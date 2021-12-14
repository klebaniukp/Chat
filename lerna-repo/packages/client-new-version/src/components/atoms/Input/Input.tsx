import React from 'react';

export const Input = (props: {
    placeholder: string;
    height: string;
    type: string;
}) => {
    return (
        <>
            <input
                type={props.type}
                className='form-control hover-shadow rounded'
                placeholder={props.placeholder}
                style={{ height: props.height }} // e.g. '4vh'
                aria-label='Username'
                aria-describedby='basic-addon1'
            />
        </>
    );
};
