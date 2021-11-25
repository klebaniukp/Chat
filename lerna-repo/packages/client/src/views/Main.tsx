import React, { useState } from 'react';
import { Navigation } from '../components/molecules/Navigation';
import { authorize } from '../api';
import { Navbar } from '../components/organism/Navbar';

export const Main = () => {
    let authorization = authorize();
    let [firstName, setFirstName] = useState('first name');
    let [lastName, setLastName] = useState('last name');
    let [email, setEmail] = useState('example@email.com');

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
            <Navbar />
            <Navigation
                firstName={firstName}
                lastName={lastName}
                email={email}
            />
        </>
    );
};
