import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IChat } from '../../../types/types';

export const TopInfoBar = () => {
    const setCurrentChat: IChat = useSelector(
        (state: RootState) => state.setCurrentChat,
    );

    return (
        <div
            className='d-flex justify-content-center align-center text-center float-end border-bottom'
            style={{ height: '4vh', width: '70vw' }}>
            <h4>
                {setCurrentChat.name} {setCurrentChat.lastname}
            </h4>
        </div>
    );
};
