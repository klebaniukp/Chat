import React from 'react';

export const FloatingInput = (props: {
    value: string;
    placeholder: string;
    isDisabled: boolean;
    type?: string;
}) => {
    return (
        <div className='form-floating mb-3'>
            {props.type === 'email' ? (
                <input
                    type='email'
                    className='form-control'
                    placeholder={props.placeholder}
                />
            ) : (
                <input
                    type='text'
                    className='form-control'
                    placeholder={props.placeholder}
                />
            )}
            <label htmlFor='floatingInput'>{props.value}</label>
        </div>
    );
};
