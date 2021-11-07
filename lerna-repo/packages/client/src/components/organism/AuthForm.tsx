import React from 'react';
import { Form } from '../molecules/Form';

export const AuthForm = (props: {
    height: string;
    formType: string;
    formMethod: string;
}) => {
    if (props.formType === 'signin') {
        return (
            <form action='/chat' method={props.formMethod}>

                <Form
                    height={props.height}
                    formType={props.formType}
                    formMethod={props.formMethod}
                />
            </form>
        );
    } else if (props.formType === 'signup') {
        <form action='/chat' method={props.formMethod}>

            <Form
                height={props.height}
                formType={props.formType}
                formMethod={props.formMethod}
            />;
        </form>
    }
    return null;
};
