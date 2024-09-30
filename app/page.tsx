"use client"
import React from 'react'
import Main from '../components/Main'
import {signIn,signOut,useSession} from 'next-auth/react';
import TasksPage from './tasks/page';

function Home() {
  const {data:session} = useSession();
  return (
    <>
     <Main/>
    </>
  )
}

export default Home