import Navbar from '@/components/Navbar';
import React from 'react';

const layout = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
       
        </div>
    );
};

export default layout;