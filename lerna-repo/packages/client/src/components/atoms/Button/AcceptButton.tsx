import React from 'react';

export const AcceptButton = (props: { type: 'button' | 'submit' }) => {
    return (
        <button type={props.type} className='btn btn-outline-success'>
            <i>accept</i>
        </button>
    );
};
