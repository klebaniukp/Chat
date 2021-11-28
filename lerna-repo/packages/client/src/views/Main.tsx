import React, { useState } from 'react';
import { Navigation } from '../components/molecules/Navigation';
import { Navbar } from '../components/organism/Navbar';

export const Main = () => {
    return (
        <>
            <Navbar />
            <Navigation />
        </>
    );
};
