import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMessageListAPI } from '../../../api';
import { UserDataDisplay } from '../../atoms/Card/UserDataDisplay';

interface IMessage {
    message: string;
    senderId: string;
}

const getMessageList = async (id: string) => {
    const response = await getMessageListAPI({ friendId: id });

    const messages: string[] = response.data.messages;

    const convertedMessages = messages.map(message => {
        const convertedMessage: IMessage = JSON.parse(message);
        return {
            value: convertedMessage.message,
            senderId: convertedMessage.senderId,
        };
    });

    console.log(convertedMessages);

    return convertedMessages;
};

export const ChatFriendModel = (props: {
    firstname: string;
    lastname: string;
    email: string;
    img: string;
    imgHeight: string;
    height: string;
    width: string;
    id: string;
}) => {
    const [isHover, setIsHover] = useState(false);

    const dispatch = useDispatch();

    const setChatData = () => {
        const data = {
            _id: props.id,
            name: props.firstname,
            lastname: props.lastname,
            email: props.email,
        };

        dispatch({
            type: 'SET_CURRENT_CHAT',
            payload: data,
        });

        getMessageList(props.id).then(messages => {
            dispatch({
                type: 'SET_MESSAGE_LIST',
                payload: messages,
            });
        });
    };

    return (
        <div
            className='d-flex justify-content-evenly'
            style={{ width: `${props.width}vw`, cursor: 'pointer' }}
            onClick={() => setChatData()}>
            {isHover ? (
                <div
                    className='d-flex flex-row justify-content-evenly align-items-center'
                    style={{
                        width: `${props.width}vw`,
                        height: `${props.height}vh`,
                        backgroundColor: '#e6e6e6',
                    }}
                    onMouseEnter={() => {
                        setIsHover(true);
                    }}
                    onMouseLeave={() => setIsHover(false)}>
                    <img
                        style={{ height: `${props.imgHeight}vh` }}
                        className='rounded-circle'
                        src={props.img}
                        alt='profile picture'
                    />
                    <div className='d-flex flex-column justify-content-between w-50'>
                        <UserDataDisplay
                            firstname={props.firstname}
                            lastname={props.lastname}
                            email={props.email}
                        />
                    </div>
                </div>
            ) : (
                <div
                    className='d-flex flex-row justify-content-evenly align-items-center'
                    style={{
                        width: `${props.width}vw`,
                        height: `${props.height}vh`,
                    }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <img
                        style={{ height: `${props.imgHeight}vh` }}
                        className='rounded-circle'
                        src={props.img}
                        alt='profile picture'
                    />
                    <div className='d-flex flex-column justify-content-between w-50'>
                        <UserDataDisplay
                            firstname={props.firstname}
                            lastname={props.lastname}
                            email={props.email}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
