import React from 'react';

export const NavbarTitle = (props: { value: string }) => {
    return (
        <a className='navbar-brand' href='#'>
            {props.value}
        </a>
    );
};
