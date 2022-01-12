import React from 'react';
import { SideBar } from '../components/organisms/SideBar';
import { ChatScreen } from '../components/organisms/ChatScreen';
import { TopInfoBar } from '../components/molecules/TopInfoBar';

export const Chat = () => {
    return (
        <div>
            <SideBar />
            <TopInfoBar />
            <ChatScreen />
        </div>
    );
};
