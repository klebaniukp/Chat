import React from 'react';
import { Button } from '../components/atoms/Button/Button';
import { ProfileInformation } from '../components/molecules/ProfileInformation';
import { UserProfile } from '../components/organism/UserProfile';

export const Profile = () => {
    return (
        <>
            <Button
                value={'Chat'}
                height={'10vh'}
                link={'/Chat'}
                width={'20vw'}
                fontSize={'xx-large'}
                type={'button'}
            />
            <ProfileInformation />
            <UserProfile />
        </>
    );
};
