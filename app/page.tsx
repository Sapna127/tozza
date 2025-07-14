"use client";
import React from 'react';
import Main from '../components/Main';
import TasksPage from './tasks/page';
import { useSession } from 'next-auth/react';

export const dynamic = 'force-dynamic';

function Home() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!session && <Main />}
      {session && <TasksPage />}
    </>
  );
}

export default Home;