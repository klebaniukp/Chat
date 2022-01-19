import React from 'react';

export const MessageModel = (props: {
    messageValue: string;
    isUserSender: boolean;
}) => {
    const decideColor = () => {
        if (props.isUserSender) {
            return '#1a75ff';
        } else {
            return '#f2f2f2';
        }
    };

    const setFloat = () => {
        if (props.isUserSender) {
            return 'float-end';
        } else {
            return 'float-start';
        }
    };

    const setFontColor = () => {
        if (props.isUserSender) {
            return 'white';
        } else {
            return 'black';
        }
    };

    const color = decideColor();
    const float = setFloat();
    const fontColor = setFontColor();

    return (
        <div>
            <div className={`${float}`} style={{ width: '60%' }}>
                <div className={`${float}`}>
                    <p
                        className='rounded-pill p-2 m-2 ps-3 pe-3'
                        style={{
                            backgroundColor: color,
                            fontSize: '2.2vh',
                            color: fontColor,
                        }}>
                        {props.messageValue}
                    </p>
                </div>
            </div>
        </div>
    );
};
