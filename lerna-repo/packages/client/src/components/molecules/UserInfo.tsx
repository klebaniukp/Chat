import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const UserInfo = (props: { email: string }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <>
            {isHover ? (
                <Link to='/'>
                    <div
                        className={`nav-item vh-6`}
                        style={{
                            opacity: '0.5',
                            color: 'white',
                            paddingTop: '0.5rem',
                        }}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}>
                        <h5>{props.email}</h5>
                    </div>
                </Link>
            ) : (
                <Link to='/'>
                    <div
                        className={`nav-item vh-6`}
                        style={{
                            opacity: '1.0',
                            color: 'white',
                            paddingTop: '0.5rem',
                        }}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}>
                        <h5>{props.email}</h5>
                    </div>
                </Link>
            )}
        </>
    );
};
