import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserDataDisplay } from '../../atoms/Card/UserDataDisplay';

export const ChatFriendModel = (props: {
    firstname: string;
    lastname: string;
    email: string;
    img: string;
    imgHeight: string;
    height: string;
    width: string;
    id: string;
}) => {
    const [isHover, setIsHover] = useState(false);

    const dispatch = useDispatch();

    const setChatData = () => {
        dispatch({
            type: 'SET_CURRENT_CHAT',
            payload: {
                _id: props.id,
                name: props.firstname,
                lastname: props.lastname,
                email: props.email,
                messages: [], //fetching data from db backend
            },
        });
    };

    return (
        <div
            className='d-flex justify-content-evenly'
            style={{ width: `${props.width}vw`, cursor: 'pointer' }}
            onClick={() => setChatData()}>
            {isHover ? (
                <div
                    className='d-flex flex-row justify-content-evenly align-items-center'
                    style={{
                        width: `${props.width}vw`,
                        height: `${props.height}vh`,
                        backgroundColor: '#e6e6e6',
                    }}
                    onMouseEnter={() => {
                        setIsHover(true);
                    }}
                    onMouseLeave={() => setIsHover(false)}>
                    <img
                        style={{ height: `${props.imgHeight}vh` }}
                        className='rounded-circle'
                        src={props.img}
                        alt='profile picture'
                    />
                    <div className='d-flex flex-column justify-content-between w-50'>
                        <UserDataDisplay
                            firstname={props.firstname}
                            lastname={props.lastname}
                            email={props.email}
                        />
                    </div>
                </div>
            ) : (
                <div
                    className='d-flex flex-row justify-content-evenly align-items-center'
                    style={{
                        width: `${props.width}vw`,
                        height: `${props.height}vh`,
                    }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <img
                        style={{ height: `${props.imgHeight}vh` }}
                        className='rounded-circle'
                        src={props.img}
                        alt='profile picture'
                    />
                    <div className='d-flex flex-column justify-content-between w-50'>
                        <UserDataDisplay
                            firstname={props.firstname}
                            lastname={props.lastname}
                            email={props.email}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
