import React from 'react';

export const PictureBox = (props: { width: string; picture: string }) => {
    return (
        <div>
            <img
                className={'float-start'}
                alt='profile picture'
                src={props.picture}
                style={{ width: props.width }}
            />
        </div>
    );
};
