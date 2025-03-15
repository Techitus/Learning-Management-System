'use client'
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

interface SessionWrapperProps {
  children: ReactNode;
}

const SessionWrapper = ({ children }: SessionWrapperProps) => {
  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;
