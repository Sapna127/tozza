import React from 'react';
import { SidebarItem } from './SidebarItem';
import {signOut} from 'next-auth/react';
import Link from 'next/link';
export const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-100 flex flex-col justify-between">
            <div className='flex-grow'>
                <SidebarItem href="/tasks" title="Tasks" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                } />
                <SidebarItem href="/reward" title="Rewards" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zM12 4v2M12 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                } />
                <SidebarItem href="/social" title="Socials" icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4 0H7a2 2 0 01-2-2V10a2 2 0 012-2h6m0 12v-6m-6 0H5m10 0h2" />
                    </svg>
                } />
            </div>
            <Link href="/" passHref>
                <button
                    className="flex items-center justify-center gap-2 bg-slate-600 text-white py-2 px-6 rounded-md mx-4 mb-6 hover:bg-red-700 transition-colors"
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10v1m-6 0h2" />
                    </svg>
                    <span>Sign out</span>
                </button>
            </Link>
             
        </div>
    );
};
