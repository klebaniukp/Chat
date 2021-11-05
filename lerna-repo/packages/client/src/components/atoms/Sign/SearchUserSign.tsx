import React from 'react';

export const SearchUserSign = (props: { height: string }) => {
    return (
        <div className="input-group-prepend">
            <span
                className="input-group-text"
                id="basic-addon1"
                style={{ fontSize: props.height }}>
                @
            </span>
        </div>
    );
};
