import React from 'react';

export const SpacingLine = (props: { isVertical: boolean }) => {
    if (props.isVertical) {
        return <hr className='opacity-0 w-1' />;
    } else {
        return <hr className='opacity-0 h-1' />;
    }
};
