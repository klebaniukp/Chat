import React, { useState } from 'react';
import { Navigation } from '../components/molecules/Navigation';
import { authorize } from '../api';

export const Main = () => {
    let authorization = authorize();
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');

    authorization
        .then(res => {
            const response = res.data;
            console.log(`response: ${response}`);
            setEmail(response.email);
            setFirstName(response.name);
            setLastName(response.lastName);
        })
        .catch(err => {
            console.log(err);
        });
    return (
        <>
            <Navigation
                firstName={firstName}
                lastName={lastName}
                email={email}
            />
        </>
    );
};
