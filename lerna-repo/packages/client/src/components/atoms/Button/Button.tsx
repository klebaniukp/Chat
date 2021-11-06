import React from 'react';
import { Link } from 'react-router-dom';

export const Button = (props: {
    value: string;
    height: string;
    link: string;
}) => {
    return (
        <Link to={props.link}>
            <button
                className="btn btn-outline-success"
                type="button"
                style={{ height: props.height }}>
                {props.value}
            </button>
        </Link>
    );
};
