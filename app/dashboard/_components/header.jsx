"use client";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Header() {
    const path = usePathname();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(false);
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        return () => clearTimeout(timeout);
    }, [path]);

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 flex p-4 items-center justify-between bg-white shadow-sm transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className='flex items-center'>
                <Image 
                    src={'/logo2.svg'} 
                    width={160} 
                    height={100} 
                    alt='logo2' 
                    className='transition-transform duration-300 ease-in-out transform hover:scale-110' 
                />
            </div>
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-purple-700 font-bold'}`} onClick={() => window.location.href = '/dashboard'}>Dashboard</li>
                <li className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-purple-700 font-bold'}`} onClick={() => window.location.href = '/dashboard/upgrade'}>Upgrade</li>
                <li className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/contact' && 'text-purple-700 font-bold'}`} onClick={() => window.location.href = '/dashboard/contact'}>Contact Us</li>
                <li className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/howitworks' && 'text-purple-700 font-bold'}`} onClick={() => window.location.href = '/dashboard/how'}>How it Works?</li>
                <li className={`hover:text-purple-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/about' && 'text-purple-700 font-bold'}`} onClick={() => window.location.href = '/dashboard/about'}>About Us</li>
            </ul>
            <UserButton />
        </div>
    );
}

export default Header;
