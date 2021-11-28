import React from 'react';
import { authorize } from '../api';
import { useUserDataContext } from '../contexts/userDataContext';

export const CollectingUserData = () => {
    const result = authorize();
    const { userData, setUserData } = useUserDataContext();

    console.log(`userData: ${userData}, type: ${typeof userData}`);

    result
        .then(res => {
            // const userData = JSON.stringify(res.data);
            setUserData('smth');
            console.log(`userData: ${userData}, type: ${typeof userData}`);
        })
        .catch(err => {
            console.log(err);
        });
};
