import React from 'react';
import { Box } from '../atoms/Box/Box';
import { PictureBox } from '../atoms/Box/PictureBox';
import profilePicture from '../../img/profilePicture.png';

export const ProfileInformation = () => {
    return (
        <>
            <div className={'d-flex flex-row'}>
                <div>
                    <div className={'d-flex flex-column'}>
                        <PictureBox width={'10vw'} picture={profilePicture} />
                        <Box width={'10vw'} height={'4vh'} overflow={false} />
                    </div>
                </div>
                <div>
                    <h2>firstname lastname</h2>
                    <Box width={'20vw'} height={'7vh'} overflow={false} />
                </div>
                <Box width={'10vw'} height={'10vh'} overflow={true} />
            </div>
        </>
    );
};

{
    /* <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> */
}
