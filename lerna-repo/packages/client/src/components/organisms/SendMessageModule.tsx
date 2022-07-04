import React from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { MessageSendInput } from '../atoms/Input/MessageSendinput';
import { AcceptButton } from '../atoms/Button/AcceptButton';
import { IChat, IUserData } from '../../types/types';

export const SendMessageModule = () => {
    const dispatch = useDispatch();
    const endpoint = process.env.REACT_APP_BACKEND_URL_LOCAL;

    const currentChat: IChat = useSelector(
        (state: RootState) => state.currentChat,
    );
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form: HTMLFormElement = e.currentTarget;
        if (form !== null && form.message !== null) {
            const message = form.message.value;
            const senderId = userData.id;

            if (endpoint) {
                const socket = io(endpoint);

                socket.emit('send message', message, senderId, currentChat._id);
            }
            form.message.value = '';
        }
    };

    return (
        <form onSubmit={e => sendMessage(e)} style={{ height: '7vh' }}>
            <div className='d-flex flex-row justify-content-center'>
                <div
                    className='d-flex flex-column justify-content-center pe-2'
                    style={{ height: '7vh', width: '61vw' }}>
                    <MessageSendInput
                        inputType={'text'}
                        name={'message'}
                        placeholder={'Send Message'}
                    />
                </div>
                <div
                    className='d-flex flex-column justify-content-center ps-2'
                    style={{ height: '7vh' }}>
                    <AcceptButton type='submit' value='send' />
                </div>
            </div>
        </form>
    );
};
