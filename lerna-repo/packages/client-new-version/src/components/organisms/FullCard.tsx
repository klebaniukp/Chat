import React from 'react';
import { CardHeader } from '../atoms/Card/CardHeader';
import { FloatingInput } from '../atoms/Input/FloatingInput';
import { DataField } from '../molecules/DataField';

export const FullCard = (props: {
    headerValue: string;
    footerValue: string;
    firstname: string;
    lastname: string;
    email: string;
    img: string;
    imgHeight: string;
}) => {
    return (
        <div className='d-flex card text-center'>
            <CardHeader value={props.headerValue} />
            <div className='d-flex justify-content-evenly card-body'>
                <img src={props.img} alt='profile' style={{ height: '30vh' }} />
                <div className='w-25'>
                    {/* <div className='d-flex flex-row align-items-center justify-content-center'>
                        <h5 className='mb-3 me-2' style={{ width: '6vw' }}>
                            Firstname:
                        </h5>
                        <FloatingInput
                            value={props.firstname}
                            placeholder={props.firstname}
                            isDisabled={false}
                        />
                    </div>
                    <div className='d-flex flex-row align-items-center justify-content-center'>
                        <h5 className='mb-3 me-2' style={{ width: '6vw' }}>
                            Lastname:
                        </h5>
                        <FloatingInput
                            value={props.lastname}
                            placeholder={props.lastname}
                            isDisabled={false}
                        />
                    </div>
                    <div className='d-flex flex-row align-items-center justify-content-center'>
                        <h5 className='mb-3 me-2' style={{ width: '6vw' }}>
                            Email:
                        </h5>
                        <FloatingInput
                            value={props.email}
                            placeholder={props.email}
                            isDisabled={false}
                            type='email'
                        />
                    </div> */}

                    <DataField value={props.firstname} label={'Firstname'} />
                    <DataField value={props.lastname} label={'Lastname'} />
                    <DataField value={props.email} label={'Email'} />
                </div>
            </div>
            <div className='card-footer text-muted'>{props.footerValue}</div>
        </div>
    );
};
