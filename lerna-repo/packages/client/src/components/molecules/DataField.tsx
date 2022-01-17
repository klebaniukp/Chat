import React from 'react';
import { FloatingInput } from '../atoms/Input/FloatingInput';

export const DataField = (props: {
    value: string;
    label: string;
    isDisabled: boolean;
    name: string;
}) => {
    return (
        <div className='d-flex flex-row align-items-center justify-content-center'>
            <p
                className='mb-3 me-2'
                style={{ width: '6vw', fontSize: '2.3vh' }}>
                {props.label}:
            </p>
            <FloatingInput
                name={props.name}
                value={props.value}
                placeholder={props.value}
                isDisabled={props.isDisabled}
            />
        </div>
    );
};
