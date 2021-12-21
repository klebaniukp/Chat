import React, { useState } from 'react';
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
    const [isDisabled, setIsDisabled] = useState(true);
    const [isUpdateBtn, setIsUpdateBtn] = useState(false);
    const [display, setDisplay] = useState(true);

    return (
        <div className='d-flex card text-center'>
            <div className='card-header'>
                <h1>{props.headerValue}</h1>
            </div>
            <div className='d-flex justify-content-evenly  card-body'>
                <img src={props.img} alt='profile' style={{ height: '30vh' }} />
                <div className='d-flex justify-content-center flex-column flex-column w-25 h-max'>
                    <form>
                        <DataField
                            value={props.firstname}
                            label={'Firstname'}
                            isDisabled={isDisabled}
                            name={'firstname'}
                        />
                        <DataField
                            value={props.lastname}
                            label={'Lastname'}
                            isDisabled={isDisabled}
                            name={'lastname'}
                        />
                        <DataField
                            value={props.email}
                            label={'Email'}
                            isDisabled={isDisabled}
                            name={'email'}
                        />
                    </form>
                </div>

                {/* this friend list will be generated in another component after validation updated */}
                <div className='overflow-auto w-25' style={{ height: '30vh' }}>
                    <FriendListModel
                        firstname={props.firstname}
                        lastname={props.lastname}
                        email={props.email}
                        img={props.img}
                        imgHeight={'3'}
                    />
                    <FriendListModel
                        firstname={props.firstname}
                        lastname={props.lastname}
                        email={props.email}
                        img={props.img}
                        imgHeight={'3'}
                    />
                    <FriendListModel
                        firstname={props.firstname}
                        lastname={props.lastname}
                        email={props.email}
                        img={props.img}
                        imgHeight={'3'}
                    />
                    <FriendListModel
                        firstname={props.firstname}
                        lastname={props.lastname}
                        email={props.email}
                        img={props.img}
                        imgHeight={'3'}
                    />
                    <FriendListModel
                        firstname={props.firstname}
                        lastname={props.lastname}
                        email={props.email}
                        img={props.img}
                        imgHeight={'3'}
                    />
                    <FriendListModel
                        firstname={props.firstname}
                        lastname={props.lastname}
                        email={props.email}
                        img={props.img}
                        imgHeight={'3'}
                    />
                    <FriendListModel
                        firstname={props.firstname}
                        lastname={props.lastname}
                        email={props.email}
                        img={props.img}
                        imgHeight={'3'}
                    />
                </div>
            </div>
            <div className='card-footer text-muted'>
                <i className='ms-5'>{props.footerValue}</i>
                <div className='float-end'>
                    {display ? (
                        <button
                            className='btn btn-outline-info me-2'
                            onClick={() => {
                                setIsDisabled(false);
                                setDisplay(false);
                                setIsUpdateBtn(true);
                            }}>
                            edit
                        </button>
                    ) : (
                        <button
                            className='btn btn-outline-info me-2 d-none'
                            onClick={() => {
                                setIsDisabled(false);
                                setDisplay(false);
                                setIsUpdateBtn(true);
                            }}>
                            edit
                        </button>
                    )}

                    {isUpdateBtn ? (
                        <button
                            className='btn btn-outline-primary'
                            onClick={() => {
                                setIsDisabled(true);
                                setDisplay(true);
                                setIsUpdateBtn(false);
                            }}>
                            update
                        </button>
                    ) : (
                        <button
                            className='btn btn-outline-primary'
                            onClick={() => {
                                setIsDisabled(true);
                                setDisplay(true);
                                setIsUpdateBtn(false);
                            }}
                            disabled>
                            update
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
