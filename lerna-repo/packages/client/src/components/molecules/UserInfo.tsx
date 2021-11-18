import React from 'react';

export const UserInfo = (props: {
    firstName: string;
    lastName: string;
    email: string;
}) => {
    return (
        <>
            <div className='card' style={{ width: '18rem' }}>
                <div className='card-header'>{props.firstName}</div>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>{props.lastName}</li>
                    <li className='list-group-item'>{props.email}</li>
                </ul>
            </div>
        </>
    );
};
