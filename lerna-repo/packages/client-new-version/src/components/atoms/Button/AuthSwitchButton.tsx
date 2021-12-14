import React from 'react';

export const AuthSwitchButton = (props: { value: string }) => {
    return (
        <button type='button' className='btn btn-link m-3 '>
            {props.value}
        </button>
    );
};
