import Reac, { useState } from 'react';

export const FriendListModel = (props: {
    firstname: string;
    lastname: string;
    email: string;
    img: string;
    imgHeight: string;
}) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className='border border-2 mb-1 w-100'>
            {isHover ? (
                <div
                    className='d-flex justify-content-evenly bg-light w-50'
                    style={{
                        height: `${props.imgHeight}vw`,
                    }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <img
                        className='rounded-circle'
                        src={props.img}
                        alt='profile picture'
                    />
                    <div className='d-flex flex-column justify-content-between p-2'>
                        <h5>
                            {props.firstname} {props.lastname}
                        </h5>
                        <h6 style={{ color: 'gray' }}>{props.email}</h6>
                    </div>
                </div>
            ) : (
                <div
                    className='d-flex justify-content-evenly w-50'
                    style={{ height: `${props.imgHeight}vw` }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <img
                        className='rounded-circle'
                        src={props.img}
                        alt='profile picture'
                    />
                    <div className='d-flex flex-column justify-content-between'>
                        <h5>
                            {props.firstname} {props.lastname}
                        </h5>
                        <h6 style={{ color: 'gray' }}>{props.email}</h6>
                    </div>
                </div>
            )}
        </div>
    );
};
