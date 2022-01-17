import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import { SideBar } from '../components/organisms/SideBar';
import { ChatScreen } from '../components/organisms/ChatScreen';
import { TopInfoBar } from '../components/molecules/Chat/TopInfoBar';

export const Chat = () => {
    const [response, setResponse] = useState('');
    const url = 'http://localhost:8080/';
    //initialize socket connection
    useEffect(() => {
        const socket = socketIO.io(url);

        socket.emit('chat message', 'Hello from client');

        socket.on('chat message', (response: string) => {
            setResponse(response);
        });
    }, []);

    return (
        <div>
            <h1>{response}</h1>
            {/* <SideBar />
            <TopInfoBar />
            <ChatScreen /> */}
        </div>
    );
};
