import React from 'react';
import { FormInput } from '../atoms/Input/FormInput';

export const FormField = (props: { value: string; inputType: string }) => {
    return (
        <div className='form-floating mb-3 w-50'>
            <FormInput inputType={props.inputType} />
            <label htmlFor={props.value}>{props.value}</label>
        </div>
    );
};
