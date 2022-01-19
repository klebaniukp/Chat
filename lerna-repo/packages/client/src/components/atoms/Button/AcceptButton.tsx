import React from 'react';

export const AcceptButton = (props: {
    type: 'button' | 'submit';
    value: string;
}) => {
    return (
        <button type={props.type} className='btn btn-outline-success'>
            <i>{props.value}</i>
        </button>
    );
};
