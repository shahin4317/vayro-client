import Image from 'next/image';
import React from 'react';
import logo from '../assets/vayro.png'
import { Label, SearchField } from "@heroui/react";
import { IoPersonOutline } from 'react-icons/io5';
import { BsHandbag } from 'react-icons/bs';
import { VscHeartFilled } from 'react-icons/vsc';

const Navbar = () => {
    return (


        <div >
            <div>
                <h1 className='bg-[#1c1a1a] text-center text-[#FFFFFF] text-sm p-1'>VAYRO-EVERDAY EDIT</h1>
            </div>
            <div className='bg-[#000000] p-5 '>
                <div className='container mx-auto flex justify-between '>
                    <div className='flex gap-5 items-center text-[#FFFFFF]'>
                        <Image src={logo} alt='VAYRO' width={100} height={100} ></Image>
                        <h1>MEN</h1>
                        <h1>WOMEN</h1>
                    </div>
                    <div className=''>
                        <SearchField className="w-150 p-" name="docs" variant="secondary">

                            <SearchField.Group className="rounded-full bg-default">
                                <SearchField.SearchIcon className="text-muted" />
                                <SearchField.Input className="placeholder:text-muted" placeholder="Components, guides..." />
                                <SearchField.ClearButton className="text-muted" />
                            </SearchField.Group>
                        </SearchField>
                    </div>


                    <div className='flex gap-4 text-[#FFFFFF] items-center'>
                        <span className='text-xl'><IoPersonOutline /></span>
                        <span className='text-xl'><VscHeartFilled /></span>
                        <span className='text-xl'><BsHandbag /></span>
                    </div>

                </div>

            </div>
            <div className='items-center text-center'>
                <h1 className='text-[#F7F7F7] p-1'> <span className='text-[#000000] font-semibold text-xs'>THE VAYRO COLLECTION</span>
                    <span className='text-[#737373] text-sm'> Men's & women's everyday essentials ✦ </span>
                    
                    <span className='text-[#000000] font-semibold text-xs'>EXPLORE NEW ARRIVALS</span></h1>
            </div>

        </div>
    );
};

export default Navbar;