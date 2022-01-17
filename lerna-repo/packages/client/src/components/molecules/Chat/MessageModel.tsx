import React from 'react';

export const MessageModel = (props: {
    messageValue: string;
    isUserSender: boolean;
}) => {
    const decideColor = () => {
        if (props.isUserSender) {
            return '#00bfff';
        } else {
            return '#d9d9d9';
        }
    };

    const color = decideColor();

    return (
        <div className='rounded'>
            <h4 style={{ color: color }}>{props.messageValue}</h4>
        </div>
    );
};
