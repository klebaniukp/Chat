import React, { useState } from 'react';
import { UserInfoBox } from '../atoms/Navbar/UserInfoBox';

export const UserInfo = (props: { email: string }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <>
            {isHover ? (
                <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <UserInfoBox
                        email={props.email}
                        path={'/profile'}
                        opacity={'1.0'}
                    />
                </div>
            ) : (
                <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <UserInfoBox
                        email={props.email}
                        path={'/profile'}
                        opacity={'0.6'}
                    />
                </div>
            )}
        </>
    );
};
