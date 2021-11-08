import React from 'react';
import { SearchUserSign } from '../atoms/Sign/SearchUserSign';
import { Input as SearchInput } from '../atoms/Input/Input';
import { Button } from '../atoms/Button/Button';

export const SearchUser = (props: {
    width: string;
    placeholder: string;
    height: string;
    buttonWidth: string;
}) => {
    return (
        <form className='form-inline' style={{ width: props.width }}>
            <div className='input-group fixed-top'>
                <SearchUserSign height={'1.7vh'} />
                <SearchInput
                    height={props.height}
                    placeholder={props.placeholder}
                    type={'text'}
                />
                <Button
                    height={props.height}
                    width={props.buttonWidth}
                    value={'search'}
                    link={'/login'}
                    fontSize={'medium'}
                    type={'button'}
                />
                <Button
                    value={'Login'}
                    height={props.height}
                    width={props.buttonWidth}
                    link={'/login'}
                    fontSize={'medium'}
                    type={'button'}
                />
            </div>
        </form>
    );
};
