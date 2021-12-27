import React from 'react';

export const DisabledSuccessBtt = (props: { value: string }) => {
    return (
        <button type='button' className='btn btn-success' disabled>
            {props.value}
        </button>
    );
};
