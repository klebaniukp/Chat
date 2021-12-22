import React from 'react';

export const FloatingInput = (props: {
    value: string;
    placeholder: string;
    isDisabled: boolean;
    name: string;
}) => {
    return (
        <div className='form-floating mb-3'>
            {props.isDisabled ? (
                <input
                    type='text'
                    name={props.name}
                    className='form-control'
                    placeholder={props.placeholder}
                    disabled
                />
            ) : (
                <input
                    type='text'
                    name={props.name}
                    className='form-control'
                    placeholder={props.placeholder}
                />
            )}
            <label htmlFor='floatingInput'>{props.value}</label>
        </div>
    );
};
