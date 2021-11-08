import React from 'react';
import { Button } from '../atoms/Button/Button';

export const Navigation = () => {
    return (
        <div className={'d-flex justify-content-center m-3'}>
            <div className={'d-flex flex-column'}>
                <Button
                    type={'button'}
                    value={'Go to chat'}
                    height={'10vh'}
                    width={'10vw'}
                    link={'/chat'}
                    fontSize={'xx-large'}
                />
                <hr />
                <div className={'d-flex'}>
                    <Button
                        type={'button'}
                        value={'Login'}
                        height={'5vh'}
                        width={'5vw'}
                        link={'/login'}
                        fontSize={'large'}
                    />
                    <hr className={'vh-5 p-1 opacity-0'} />
                    <Button
                        type={'button'}
                        value={'Register'}
                        height={'5vh'}
                        width={'5vw'}
                        link={'/register'}
                        fontSize={'large'}
                    />
                </div>
                <hr />
            </div>
        </div>
    );
};
