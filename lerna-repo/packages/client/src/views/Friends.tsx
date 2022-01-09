import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFriendList } from '../services/setFriendList';
import { FriendListManagement } from '../components/organisms/FriendListManagement';

export const Friends = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        setFriendList().then(friendList => {
            dispatch({
                type: 'SET_FULFILLED_FRIENDLIST',
                payload: friendList,
            });
        });
    }, []);

    return (
        <>
            <FriendListManagement />
        </>
    );
};
