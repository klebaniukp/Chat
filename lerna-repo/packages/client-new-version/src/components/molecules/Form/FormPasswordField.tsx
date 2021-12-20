import React, { useState } from 'react';
import { FormInput } from '../../atoms/Input/FormInput';

export const FormPasswordField = (props: { value: string; name: string }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className='form-floating mb-3 w-50'>
            {isShowPassword ? (
                <FormInput name={props.name} inputType={'text'} />
            ) : (
                <FormInput name={props.name} inputType={'password'} />
            )}
            <label htmlFor={props.value}>{props.value}</label>
        </div>
    );
};
