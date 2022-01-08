import React, { useState } from 'react';
import { sendFriendRequestAPI } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserDataDisplay } from '../atoms/Card/UserDataDisplay';
import { ButtonNoLink } from '../atoms/Button/ButtonNoLink';
import { DisabledSuccessBtt } from '../atoms/Button/DisabledSuccessBtt';
import { DisabledInfoBtt } from '../atoms/Button/DisabledInfoBtt';
import { DangerButton } from '../atoms/Button/DangerButton';
import { ISearchedUser } from '../../types/types';

export const FriendListModel = (props: {
    firstname: string;
    lastname: string;
    email: string;
    img: string;
    imgHeight: string;
    width: string;
    height: string;
}) => {
    const [isHover, setIsHover] = useState(false);

    const decideWhichButtonToRender = () => {

    }

    return (
        <div
            className='d-flex justify-content-evenly border border-2 mb-1 mt-1'
            style={{ width: `${props.width}vw` }}>
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
                    {/* {decideWhichButtonToRender()} */}
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
                    {/* {decideWhichButtonToRender()} */}
                </div>
            )}
        </div>
    );
};
