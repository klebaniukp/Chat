import React from 'react';
import { Input } from '../atoms/Input/Input';
import { SpacingLine } from '../atoms/Line/SpacingLine';

export const Form = (props: {
    height: string;
    formType: string;
    formMethod: string;
}) => {
    if (props.formType === 'signin') {
        return (
            <>
                <div className='d-grid gap-4'>
                    <h3> Type your data below </h3>
                    <Input
                        placeholder={'Name'}
                        type={'text'}
                        height={props.height}
                    />
                    <Input
                        placeholder={'Surname'}
                        type={'text'}
                        height={props.height}
                    />
                    <Input
                        placeholder={'e-mail'}
                        type={'text'}
                        height={props.height}
                    />
                    <Input
                        placeholder={'password'}
                        type={'text'}
                        height={props.height}
                    />
                </div>
                <SpacingLine isVertical={false} />
                <Input
                    placeholder={'Login'}
                    type={'submit'}
                    height={props.height}
                />
            </>
        );
    } else if (props.formType === 'signup') {
        return (
            <>
                <div className='d-grid gap-4'>
                    <h3> Type your data below </h3>
                    <Input
                        placeholder={'Name'}
                        type={'text'}
                        height={props.height}
                    />
                    <Input
                        placeholder={'Surname'}
                        type={'text'}
                        height={props.height}
                    />
                    <Input
                        placeholder={'e-mail'}
                        type={'text'}
                        height={props.height}
                    />
                    <Input
                        placeholder={'password'}
                        type={'text'}
                        height={props.height}
                    />
                    <Input
                        placeholder={'Repeat password'}
                        type={'text'}
                        height={props.height}
                    />
                </div>
                <SpacingLine isVertical={false} />
                <Input
                    placeholder={'Register'}
                    type={'submit'}
                    height={props.height}
                />
            </>
        );
    }
    return null;
};
