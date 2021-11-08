import React from 'react';

export const Submit = (props: { value: string }) => {
    return (
        <button type='submit' className='btn btn-primary'>
            {props.value}
        </button>
    );
};
