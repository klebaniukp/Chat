import React from 'react';
import { SearchUserSign } from '../atoms/Sign/SearchUserSign';
import { Input as SearchInput } from '../atoms/Input/Input';
import { Button } from '../atoms/Button/Button';

export const SearchUser = (props: {
    width: string;
    placeholder: string;
    height: string;
}) => {
    return (
        <form className="form-inline" style={{ width: props.width }}>
            <div className="input-group fixed-top">
                <SearchUserSign height={'1.7vh'} />
                <SearchInput
                    height={props.height}
                    placeholder={props.placeholder}
                />
                <Button
                    height={props.height}
                    value={'search'}
                    link={'/login'}
                />
                <Button value={'Login'} height={props.height} link={'/login'} />
            </div>
        </form>
    );
};
