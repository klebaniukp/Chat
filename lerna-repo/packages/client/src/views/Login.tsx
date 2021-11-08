import React from 'react';
import { AuthForm, signin, signup } from '../components/organism/AuthForm';

export const Login = () => {
    return (
        <div
            className={
                'position-absolute d-flex align-items-center justify-content-center card border-0 '
            }
            style={{
                fontSize: 'large',
                left: '50%',
                top: '45%',
                transform: 'translate(-50%, -50%)',
            }}>
            <AuthForm />
        </div>
    );
};

// <div
//     className='d-inline-block'
//     style={{
//         width: '500 px',
//         height: '500 px',
//         border: '1px solid black',
//     }}>
//     <div
//         className='form-floating mb-3 vw-30'
//         style={{ width: '200 px' }}>
//         <input
//             type='email'
//             className='form-control'
//             id='floatingInput'
//             placeholder='name@example.com'
//         />
//         <label htmlFor='floatingInput'>Email address</label>
//     </div>
//     <div className='form-floating vw-30' style={{ width: '200 px' }}>
//         <input
//             type='password'
//             className='form-control'
//             id='floatingPassword'
//             placeholder='Password'
//         />
//         <label htmlFor='floatingPassword'>Password</label>
//     </div>
// </div>
