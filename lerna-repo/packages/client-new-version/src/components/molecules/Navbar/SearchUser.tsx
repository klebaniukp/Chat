import React from 'react';
import { Submit } from '../../atoms/Button/Submit';

export const SearchUser = () => {
    return (
        <div style={{ color: 'blue' }} className={''}>
            <div className={'d-flex flex-row vh-12'}>
                <div>
                    <input
                        type='text'
                        placeholder={'search user'}
                        className={'rounded bg-secondary text-white'}
                        style={{ height: '5vh', marginTop: '1.5vh' }}
                    />
                </div>
                <div>
                    <Submit value={'search'} />
                </div>
            </div>
        </div>
    );
};
