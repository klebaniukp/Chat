import React from 'react';

export const Box = (props: {
    width: string;
    height: string;
    overflow: boolean;
}) => {
    return (
        <>
            {props.overflow ? (
                <div
                    className={
                        'overflow-scroll border border-light bg-body'
                    }
                    style={{ height: props.height, width: props.width }}>
                        
                    </div>
            ) : (
                <div
                    className={'border border-light bg-body'}
                    style={{ height: props.height, width: props.width }}></div>
            )}
        </>
    );
};
