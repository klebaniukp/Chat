import React from 'react';
import { CardHeader } from '../atoms/Card/CardHeader';
import { FloatingInput } from '../atoms/Input/FloatingInput';
import { DataField } from '../molecules/DataField';
import { FriendListModel } from '../molecules/FriendListModel';

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
            <div className='d-flex justify-content-evenly  card-body'>
                <img src={props.img} alt='profile' style={{ height: '30vh' }} />
                <div className='d-flex justify-content-center flex-column flex-column w-25 h-max'>
                    <DataField
                        value={props.firstname}
                        label={'Firstname'}
                        isDisabled={true}
                    />
                    <DataField
                        value={props.lastname}
                        label={'Lastname'}
                        isDisabled={true}
                    />
                    <DataField
                        value={props.email}
                        label={'Email'}
                        isDisabled={true}
                    />
                </div>
            </div>
            <div className='card-footer text-muted'>
                <i>{props.footerValue}</i>
            </div>
            <div>
                <FriendListModel
                    firstname={props.firstname}
                    lastname={props.lastname}
                    email={props.email}
                    img={props.img}
                    imgHeight={'5'}
                />
            </div>
        </div>
    );
};
