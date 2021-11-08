import React from 'react';
import { Button } from '../atoms/Button/Button';

export const Navigation = () => {
    return (
        // className={`position-absolute w-75 d-flex align-items-center
        //         justify-content-center card border-2 bg-light `}
        <div
            className={`position-absolute w-50 d-flex align-items-center justify-content-center card border-2 m-3 bg-light`}
            style={{
                fontSize: 'large',
                left: '50%',
                top: '45%',
                transform: 'translate(-50%, -50%)',
            }}>
            {/* <div className="card-title"></div> */}
            <div className={'d-flex flex-column m-2'}>
                <Button
                    type={'button'}
                    value={'Go to chat'}
                    height={'15vh'}
                    width={'20vw'}
                    link={'/chat'}
                    fontSize={'xxx-large'}
                />
                <hr />
                <div className={'d-flex margin'}>
                    <Button
                        type={'button'}
                        value={'Login'}
                        height={'10vh'}
                        width={'10vw'}
                        link={'/login'}
                        fontSize={'x-large'}
                    />
                    <hr className={'vh-5 p-1 opacity-0'} />
                    <Button
                        type={'button'}
                        value={'Register'}
                        height={'10vh'}
                        width={'10vw'}
                        link={'/register'}
                        fontSize={'x-large'}
                    />
                </div>
                <hr />
            </div>
        </div>
    );
};
