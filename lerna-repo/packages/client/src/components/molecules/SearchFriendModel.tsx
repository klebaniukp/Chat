import React, { useState } from 'react';
import { UserDataDisplay } from '../atoms/Card/UserDataDisplay';
import { ButtonNoLink } from '../atoms/Button/ButtonNoLink';
import { DisabledSuccessBtt } from '../atoms/Button/DisabledSuccessBtt';

export const SearchFriendModel = (props: {
    img: string;
    width: string;
    height: string;
    firstname: string;
    lastname: string;
    email: string;
    userId: string;
    imgHeight: string;
}) => {
    const [isHover, setIsHover] = useState(false);
    const [isFriend, setIsFriend] = useState(false);

    return (
        <div className='d-flex justify-content-evenly border border-2 mb-1 mt-1 w-25'>
            {isHover ? (
                <div
                    className='d-flex flex-row justify-content-evenly align-items-center bg-light'
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
                    {isFriend ? (
                        <DisabledSuccessBtt value={'friend'} />
                    ) : (
                        <ButtonNoLink type='submit' value='add' />
                    )}
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
                    {isFriend ? (
                        <DisabledSuccessBtt value={'friend'} />
                    ) : (
                        <ButtonNoLink type='submit' value='add' />
                    )}
                </div>
            )}
        </div>
    );
};
