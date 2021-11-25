import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarTitle = (props: { value: string }) => {
    return (
        <Link to='/Chat' className='navbar-brand'>
            {props.value}
        </Link>
    );
};
