import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { MessageModel } from '../molecules/Chat/MessageModel';
import { IMessage, IUserData, IChat } from '../../types/types';

export const ChatScreen = () => {
    const messageList: IMessage[] = useSelector(
        (state: RootState) => state.messageList,
    );
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const generateMessage = () => {
        const jsxElement: JSX.Element[] = [];

        for (let i = 0; i < messageList.length; i++) {
            const message: IMessage = messageList[i];

            jsxElement.push(
                <MessageModel
                    key={i}
                    messageValue={message.value}
                    isUserSender={message.senderId === userData.id}
                />,
            );
        }

        return jsxElement;
    };

    return (
        <div
            className='border-bottom d-flex flex-column overflow-auto'
            style={{ width: '70vw', height: '79vh' }}>

            {generateMessage()}
        </div>
    );
};
