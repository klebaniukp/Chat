import React from 'react';

export const FormInput = (props: { inputType: string }) => {
    return (
        <input
            type={props.inputType}
            className='form-control'
            id='floatingInput'
            placeholder='name@example.com'
        />
    );
};
