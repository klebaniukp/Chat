import React from 'react';

export const DropdownItem = (props: { value: string }) => {
    return (
        <li>
            <a className='dropdown-item' href='#'>
                {props.value}
            </a>
        </li>
    );
};
