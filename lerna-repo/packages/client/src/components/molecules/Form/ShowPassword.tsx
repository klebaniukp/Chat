import React from 'react';
import { CheckBox } from '../../atoms/Input/CheckBox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';

export const ShowPassword = (props: { value: string }) => {
    const isShowPassword: boolean = useSelector(
        (state: RootState) => state.showPassword,
    );
    const dispatch = useDispatch();
    return (
        <div className='form-check'>
            <div
                onClick={() => {
                    const isShowPasswordToggle: boolean = !isShowPassword;
                    dispatch({
                        type: 'SET_IS_SHOW_PASSWORD',
                        payload: isShowPasswordToggle,
                    });
                }}>
                <CheckBox />
            </div>
            <label className='form-check-label' htmlFor='showPassword'>
                {props.value}
            </label>
        </div>
    );
};
