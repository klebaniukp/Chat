import React from 'react';

export const DisabledInfoBtt = (props: { value: string }) => {
    return (
        <button type='button' className='btn btn-outline-info'>
            {props.value}
        </button>
    );
};
