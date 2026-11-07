import EditorialIntro from '@/components/EditorialIntro';
import HeroSlider from '@/components/HeroSlider';
import Navbar from '@/components/Navbar';
import React from 'react';

const page = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <EditorialIntro></EditorialIntro>

        </div>
    );
};

export default page;