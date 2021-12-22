import React from 'react';

export const CardHeader = (props: { value: string }) => {
    return <h1 className='card-header'>{props.value}</h1>;
};
