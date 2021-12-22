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
            <h5 className='mb-3 me-2' style={{ width: '6vw' }}>
                {props.label}:
            </h5>
            <FloatingInput
                name={props.name}
                value={props.value}
                placeholder={props.value}
                isDisabled={props.isDisabled}
            />
        </div>
    );
};
