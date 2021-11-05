import React from 'react';
import { SearchUser } from '../molecules/SearchUser';
import { ContactProfile } from '../molecules/ContactProfile';

export const ChatBar = () => {
    return (
        <div
            className="blockquote text-left overflow-auto"
            style={{ width: '18vw', fontSize: '0.8rem', float: 'left' }}>
            <SearchUser
                width={'18 rem'}
                height={'4vh'}
                placeholder={'Search for contacts'}
            />
            <ContactProfile />
            <ContactProfile />
            <ContactProfile />
            <ContactProfile />
            <ContactProfile />
            <ContactProfile />
            <ContactProfile />
            <ContactProfile />
            <ContactProfile />
            <ContactProfile />
        </div>
        // <div className="overflow-scroll" style={{ width: '19vw' }}></div>
    );
};
