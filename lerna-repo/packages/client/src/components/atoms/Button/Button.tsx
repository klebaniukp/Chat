import React from 'react';

export const Button = (props: { value: string; height: string }) => {
    return (
        <button
            className="btn btn-outline-success"
            type="button"
            style={{ height: props.height }}>
            {props.value}
        </button>
    );
};
