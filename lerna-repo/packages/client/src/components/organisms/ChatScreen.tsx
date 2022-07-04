import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { MessageModel } from '../molecules/Chat/MessageModel';
import { IMessage, IUserData, IChat } from '../../types/types';

export const ChatScreen = () => {
    const messageList: IMessage[] = useSelector(
        (state: RootState) => state.messageList,
    );
    // console.log(messageList)
    // //sort message list by date latest first
    // const sortedMessageList: IMessage[] = messageList
    //     .sort((a: IMessage, b: IMessage) => {
    //         return b.date.getTime() - a.date.getTime();
    //     }
    //     )
    //     .map(message => {
    //         const convertedMessage: IMessage = JSON.parse(message);
    //         return {
    //             value: convertedMessage.message,
    //             senderId: convertedMessage.senderId,
    //             date: convertedMessage.date,
    //         };
    //     }
    //     );
    // console.log(sortedMessageList);
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const generateMessage = () => {
        const jsxElement: JSX.Element[] = [];

        //sort messages by timestamp (descending)
    //     const sortedMessages: IMessage[] = messageList
    //     .map((message: string) => {
    //         const messageData = JSON.parse(message);

    //         return {
    //             value: messageData.message,
    //             senderId: messageData.senderId,
    //             date: new Date(messageData.date),
    //         };
    //     })
    //     .sort((a: IMessage, b: IMessage) => {
    //         return b.date.getTime() - a.date.getTime();
    //     });
    // console.log(sortedMessages);

        for (let i = messageList.length - 1; i >= 0; i--) {
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
