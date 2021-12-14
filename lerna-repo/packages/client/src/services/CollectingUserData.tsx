import React from 'react';
import { authorize } from '../api';
import { useUserDataContext } from '../contexts/userDataContext';

export const CollectingUserData = () => {
    const result = authorize();
    const { userData, setUserData } = useUserDataContext();

    result
        .then(res => {
            const userData = JSON.stringify(res.data);
            setUserData(userData);
            console.log(
                `userData: ${userData}, type: ${typeof userData} another time`,
            );
        })
        .catch(err => {
            console.log(err);
        });
};
