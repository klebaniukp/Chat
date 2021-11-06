import React from 'react';
import { SearchUser } from '../molecules/SearchUser';
import { ContactProfile } from '../molecules/ContactProfile';

export const ChatBar = () => {
    return (
        <div
            className="blockquote text-left overflow-auto"
            style={{
                height: 'vmax',
                width: '18vw',
                fontSize: '0.8rem',
                float: 'left',
            }}>
            <SearchUser
                width={'18 rem'}
                height={'4vh'}
                placeholder={'Login'}
                buttonWidth={'6 rem'}
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
