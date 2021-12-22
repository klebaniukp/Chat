import React from 'react';
import { Input } from '../../atoms/Input/Input';
import { SpacingLine } from '../../atoms/Line/SpacingLine';
import { Button } from '../../atoms/Button/Button';

export const Form = (props: {
    height: string;
    formType: string;
    formMethod: string;
}) => {
    if (props.formType === 'signin') {
        return (
            <>
                <div className={'w-75 '}>
                    <div className='d-grid gap-4 vw-60'>
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
                    <Button
                        value={'login'}
                        height={'5vh'}
                        link={'/'}
                        width={'5vw'}
                        fontSize={'medium'}
                        type={'submit'}
                    />
                </div>
            </>
        );
    } else if (props.formType === 'signup') {
        return (
            <>
                <div className={'w-75 '}>
                    <div className='d-grid gap-4 vw-60'>
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
                    <Button
                        value={'register'}
                        height={'5vh'}
                        link={'/'}
                        width={'5vw'}
                        fontSize={'medium'}
                        type={'button'}
                    />
                </div>
            </>
        );
    }
    return null;
};
