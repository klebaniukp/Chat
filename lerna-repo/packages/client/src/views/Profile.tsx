import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/atoms/Button/Button';

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
        </>
    );
};
