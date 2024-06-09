"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userLogin');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }

        const handleLogin = () => {
            const storedUserData = localStorage.getItem('userLogin');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        };

        const handleLogout = () => {
            setUserData(null);
        };

        window.addEventListener('login', handleLogin);
        window.addEventListener('logout', handleLogout);

        return () => {
            window.removeEventListener('login', handleLogin);
            window.removeEventListener('logout', handleLogout);
        };
    }, []);

    const isAuthenticated = userData !== null;

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <Image
                                    src="/logo.png"
                                    alt="Brand Logo"
                                    width={40}
                                    height={40}
                                    className="mr-3"
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-6">
                                <Link href="/" passHref>
                                    <span className="text-white px-4 py-2 rounded-md text-lg font-medium transition-colors hover:text-orange-500 cursor-pointer">
                                        Home
                                    </span>
                                </Link>
                                {isAuthenticated && (
                                    <>
                                        <Link href="/profile" passHref>
                                            <span className="text-white px-4 py-2 rounded-md text-lg font-medium transition-colors hover:text-orange-500 cursor-pointer">
                                                Perfil
                                            </span>
                                        </Link>
                                        <Link href="/cart" passHref>
                                            <span className="cursor-pointer">
                                                <Image
                                                src="/cart.png"
                                                alt="Carrito"
                                                width={46}
                                                height={46}
                                                className="transition-colors hover:opacity-75"
                                                />
                                            </span>
                                        </Link>
                                    </>
                                )}
                                {!isAuthenticated && (
                                    <>
                                        <Link href="/register" passHref>
                                            <span className="text-white px-4 py-2 rounded-md text-lg font-medium transition-colors hover:text-orange-500 cursor-pointer">
                                                Registro
                                            </span>
                                        </Link>
                                        <Link href="/login" passHref>
                                            <span className="text-white px-4 py-2 rounded-md text-lg font-medium transition-colors hover:text-orange-500 cursor-pointer">
                                                Login
                                            </span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/" passHref>
                            <span className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                                Home
                            </span>
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link href="/profile" passHref>
                                    <span className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                                        Perfil
                                    </span>
                                </Link>
                                <Link href="/cart" passHref>
                                    <span className="cursor-pointer">
                                        <Image
                                        src="/cart.png"
                                        alt="Carrito"
                                        width={46}
                                        height={46}
                                        className="transition-colors hover:opacity-75"
                                        />
                                    </span>
                                </Link>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <Link href="/register" passHref>
                                    <span className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                                        Registro
                                    </span>
                                </Link>
                                <Link href="/login" passHref>
                                    <span className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                                        Login
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
