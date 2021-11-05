import React from 'react';

export const Input = (props: { placeholder: string; height: string }) => {
    return (
        <>
            <input
                type="text"
                className="form-control"
                placeholder={props.placeholder}
                style={{ height: props.height }}
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </>
    );
};
