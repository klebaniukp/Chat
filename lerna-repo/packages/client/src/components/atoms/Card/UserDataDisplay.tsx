import React from 'react';

export const UserDataDisplay = (props: {
    firstname: string;
    lastname: string;
    email: string;
}) => {
    return (
        <div className='d-flex flex-column justify-content-between'>
            <h5>
                {props.firstname} {props.lastname}
            </h5>
            <h6 style={{ color: 'gray' }}>{props.email}</h6>
        </div>
    );
};
