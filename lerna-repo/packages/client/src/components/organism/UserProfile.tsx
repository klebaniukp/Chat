import React from 'react';
import { Navbar } from './Navbar';
import { Card } from '../atoms/Box/Card';
import { PictureBox } from '../atoms/Box/PictureBox';
import { Box } from '../atoms/Box/Box';
import { Input } from '../atoms/Input/Input';

import profilePicture from '../../img/profilePicture.png';

export const UserProfile = () => {
    return (
        <>
            <Navbar />
            <div
                className={`position-absolute w-75 h-auto
                d-flex card border-2 bg-light`}
                style={{
                    fontSize: 'large',
                    left: '50%',
                    top: '55%',
                    transform: 'translate(-50%, -50%)',
                }}>
                <div className={'m-auto'}>
                    <Card value={'Firstname Lastname'} />
                </div>
                <div className={'d-flex flex-column float-start'}>
                    <div
                        className={''}
                        style={{ marginLeft: '3vw', marginBottom: '3vw' }}>
                        <PictureBox width={'15vw'} picture={profilePicture} />
                    </div>
                </div>
            </div>
        </>
    );
};
