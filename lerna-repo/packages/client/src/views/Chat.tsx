import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { SideBar } from '../components/organisms/SideBar';
import { ChatScreen } from '../components/organisms/ChatScreen';
import { TopInfoBar } from '../components/molecules/Chat/TopInfoBar';

export const Chat = () => {
    const [response, setResponse] = useState('');
    const endpoint = process.env.REACT_APP_BACKEND_URL;

    //initialize socket connection
    useEffect(() => {
        if (endpoint) {
            const socket = io(endpoint);

            socket.emit('chat message', 'Hello from client');

            socket.on('chat message', (res: string) => {
                setResponse(response + res);
            });
        }
    }, []);

    return (
        <div>
            <SideBar />
            <TopInfoBar />
            <ChatScreen />
        </div>
    );
};
