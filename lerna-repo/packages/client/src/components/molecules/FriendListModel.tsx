import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserDataDisplay } from '../atoms/Card/UserDataDisplay';
import { DisabledSuccessBtt } from '../atoms/Button/DisabledSuccessBtt';
import { DisabledInfoBtt } from '../atoms/Button/DisabledInfoBtt';
import { DangerButton } from '../atoms/Button/DangerButton';
import { AcceptButton } from '../atoms/Button/AcceptButton';
import { RejectButton } from '../atoms/Button/RejectButton';
import {
    manageFriendRequestAPI,
    generateFriendList,
    removeFriendAPI,
} from '../../api';
import { IFullFriendData } from '../../types/types';

export const FriendListModel = (props: {
    firstname: string;
    lastname: string;
    email: string;
    img: string;
    imgHeight: string;
    width: string;
    height: string;
    isUserSender: boolean;
    friendRequestStatus: boolean;
    id: string;
}) => {
    const [isHover, setIsHover] = useState(false);

    const dispatch = useDispatch();

    const manageFriendRequest = (finalStatus: boolean) => {
        manageFriendRequestAPI({
            friendId: props.id,
            finalStatus: finalStatus,
        }).then(res => {
            if (res.status === 200) {
                generateFriendList()
                    .then(response => {
                        if (response.status === 200) {
                            const friendList: IFullFriendData[] =
                                response.data.friendList;

                            if (friendList.length > 0) {
                                dispatch({
                                    type: 'SET_FULFILLED_FRIENDLIST',
                                    payload: friendList,
                                });
                            } else {
                                dispatch({
                                    type: 'SET_FULFILLED_FRIENDLIST',
                                    payload: [],
                                });
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    };

    const removeFriend = () => {
        removeFriendAPI({
            friendId: props.id,
        }).then(res => {
            if (res.status === 200) {
                generateFriendList()
                    .then(response => {
                        if (response.status === 200) {
                            const friendList: IFullFriendData[] =
                                response.data.friendList;

                            if (friendList.length > 0) {
                                dispatch({
                                    type: 'SET_FULFILLED_FRIENDLIST',
                                    payload: friendList,
                                });
                            } else {
                                dispatch({
                                    type: 'SET_FULFILLED_FRIENDLIST',
                                    payload: [],
                                });
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    };

    const decideWhichButtonToRender = () => {
        if (props.friendRequestStatus) {
            return (
                <>
                    <div>
                        <DisabledSuccessBtt value='friend' />
                    </div>
                    <div onClick={() => removeFriend()}>
                        <DangerButton value='delete' />
                    </div>
                </>
            );
        }

        if (props.isUserSender) {
            return (
                <>
                    <div>
                        <DisabledInfoBtt value='pending' />
                    </div>
                    <div onClick={() => manageFriendRequest(false)}>
                        <DangerButton value={'cancel'} />
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div onClick={() => manageFriendRequest(true)}>
                        <AcceptButton type='button' value='accept' />
                    </div>
                    <div onClick={() => manageFriendRequest(false)}>
                        <RejectButton />
                    </div>
                </>
            );
        }
    };

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
                    {decideWhichButtonToRender()}
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
                    {decideWhichButtonToRender()}
                </div>
            )}
        </div>
    );
};
