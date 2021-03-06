import React from 'react';
import Image from 'next/image';
import { ShoppingCartIcon, BellIcon, MailIcon, LoginIcon, LogoutIcon } from '@heroicons/react/solid';
import SearchBox from './SearchBox';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client'


function Header() {
    const basketItems = useSelector(selectItems);
    const [session] = useSession();

    return (
        <header className="fixed z-20 w-full top-0 bg-white">
            {/* Navtop */}
           <div className="px-2 py-1 bg-gray-100 flex justify-between lg:px-7">
               {/* topleft */}
               <div className="flex place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className='text-xs text-gray-500 md:ml-1'>Download Tokopedia App</p>
               </div>
               {/* topright */}
               <div className="hidden md:flex place-items-center">
                <p className='text-xs text-gray-500 mx-2 md:mx-3'>Tentang Tokopedia</p>
                <p className='text-xs text-gray-500 mx-2 md:mx-3'>Mitra Tokopedia</p>
                <p className='text-xs text-gray-500 mx-2 md:mx-3'>Tokopedia Care</p>
               </div>
           </div>

            {/* bottom nav */}
           <div className="px-5 lg:px-7 py-1 w-full h-auto flex place-items-center text-gray-500 shadow-md justify-between md:justify-items-start">
                <Link href="/">
                    <div className="flex place-items-center">
                        <Image width={150} height={50} className='cursor-pointer' objectFit="contain" src="https://i.ibb.co/rvbmzzW/Logo-Tokopedia.png"/>
                    </div>
                </Link>
               <p className='hidden md:inline text-xs mx-3 py-1 px-2 align-middle hover:bg-gray-100 rounded-sm hover:text-tokped_green duration-200 cursor-pointer'>Kategori</p>
               <SearchBox />
                <div className="flex ml-auto place-items-center md:w-36 justify-between md:flex-grow-0 border-r-2 border-gray-300 px-2 md:px-4">
                    <Link href="/mycart">
                        <div className="relative w-8 h-8 flex place-items-center justify-center rounded-md hover:bg-gray-100 cursor-pointer">
                            <ShoppingCartIcon className="h-5 w-5 text-gray-500" />
                            <span className={` ${basketItems.length ? "inline" : "hidden"} absolute border border-white min-w-4 w-4 h-4 flex place-items-center justify-center top-0 right-0 rounded-lg text-white text-xs bg-red-500`}>{basketItems.reduce((quantity, cart) => (quantity + cart.quantity),0)}</span>
                        </div>
                    </Link>
                    <div className="w-8 h-8 flex place-items-center justify-center rounded-md hover:bg-gray-100 cursor-pointer">
                        <BellIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="w-8 h-8 flex place-items-center justify-center rounded-md hover:bg-gray-100 cursor-pointer">
                        <MailIcon className="h-5 w-5 text-gray-500" />
                    </div>
                </div>
                {session ? (
                <div className="flex place-items-center px-2 md:pl-4 group" onClick={signOut}>
                    <img className="rounded-full w-8 h-8" src={session.user.image}/>
                    <p className="hidden md:inline text-xs ml-2">{session.user.name}</p>
                    <div className="group absolute w-full z-0 bg-white opacity-0 group-hover:opacity-100">
                        <button className="hidden md:inline w-24 py-2 rounded-md border border-tokped_green focus:outline-none text-sm font-bold text-tokped_green m-2 hover:bg-tokped_green hover:text-white duration-200">Keluar</button>
                        <button className="md:hidden py-2 rounded-md px-3 border border-tokped_green focus:outline-none text-sm font-bold text-tokped_green m-2 hover:bg-tokped_green hover:text-white duration-200"><LogoutIcon className="h-4 w-4"/></button>
                    </div>
                </div>) 
                : 
                (
                <div className="flex place-items-center px-2 md:pl-4" onClick={signIn}>
                    <button className="hidden md:inline w-24 py-2 rounded-md px-3 border border-tokped_green focus:outline-none text-sm font-bold text-tokped_green m-2 hover:bg-tokped_green hover:text-white duration-200">Masuk</button>
                    <button className="md:hidden py-2 rounded-md px-3 border border-tokped_green focus:outline-none text-sm font-bold text-tokped_green m-2 hover:bg-tokped_green hover:text-white duration-200"><LoginIcon className="h-4 w-4"/></button>
                </div>
                )}
           </div>
        </header>
    )
}

export default Header
