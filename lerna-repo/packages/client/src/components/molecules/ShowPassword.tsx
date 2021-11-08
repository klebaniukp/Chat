import React from 'react';
import { CheckBox } from '../atoms/Input/CheckBox';

export const ShowPassword = (props: { value: string }) => {
    return (
        <div className='form-check'>
            <CheckBox />
            <label className='form-check-label' htmlFor='showPassword'>
                {props.value}
            </label>
        </div>
    );
};
