import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { SideBar } from '../components/organisms/SideBar';
import { ChatScreen } from '../components/organisms/ChatScreen';
import { TopInfoBar } from '../components/molecules/Chat/TopInfoBar';
import { SendMessageModule } from '../components/organisms/SendMessageModule';
import { IChat, IUserData, IMessage } from '../types/types';

export const Chat = () => {
    const endpoint = process.env.REACT_APP_BACKEND_URL;
    const dispatch = useDispatch();

    const currentChat: IChat = useSelector(
        (state: RootState) => state.currentChat,
    );

    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const messageList: IMessage[] = useSelector(
        (state: RootState) => state.messageList,
    );

    //initialize & handle socket connection
    useEffect(() => {
        if (endpoint) {
            const socket = io(endpoint);

            console.log(`${userData.id} -> ${currentChat._id}`);
            socket.on(
                `${userData.id}:${currentChat._id}`,
                (message: { message: string; senderId: string }) => {
                    console.log(`connection established`);
                    console.log(`message: ${message.message}`);
                    dispatch({
                        type: 'ADD_MESSAGE',
                        payload: {
                            value: message.message,
                            senderId: message.senderId,
                        },
                    });
                },
            );
        }
    }, [userData.id, currentChat._id]);

    return (
        <div>
            <SideBar />
            <TopInfoBar />
            <ChatScreen />
            <SendMessageModule />
        </div>
    );
};
