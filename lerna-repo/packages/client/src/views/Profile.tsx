import React from 'react';
import { FullCard } from '../components/organisms/FullCard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IUserData } from '../types/types';
import profile from '../img/profilePicture.png';

export const Profile = () => {
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    return (
        <div
            className='d-flex justify-content-center align-items-center w-100 h-75'
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -40%)',
            }}>
            <div className='w-75 h-75'>
                <FullCard
                    headerValue={'Profile Data'}
                    footerValue={'klebaniukp chat template'}
                    firstname={userData.name}
                    lastname={userData.lastName}
                    email={userData.email}
                    img={profile}
                    imgHeight='25'
                />
            </div>
        </div>
    );
};
