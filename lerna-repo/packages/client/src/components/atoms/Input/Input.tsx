import React from 'react';

export const Input = (props: { placeholder: string; height: string }) => {
    return (
        <>
            <input
                type="text"
                className="form-control sticky-top"
                placeholder={props.placeholder}
                style={{ height: props.height }} // e.g. '4vh'
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </>
    );
};
