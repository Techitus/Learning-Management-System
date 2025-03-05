/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { DashboardLayout } from '@/components/layout/admin-dashboard-layout';
import { Role } from '@/database/models/user.schema';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ClockLoader } from 'react-spinners';

export default function Layout({ children }: { children: React.ReactNode }) {
 const {data:session,status}= useSession()
 const router = useRouter()
 useEffect(()=>{
    if(status === 'loading'){
      return;
    }if(!session || session.user.role !== Role.Admin){
     
      router.push('/unauthorized')

    }

 },[session,status])
 if(status === 'loading' || status === 'unauthenticated' ) return (
  <div>
<div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-green-500/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-green-300/10 blur-[100px]" />
          <div className="h-screen flex items-center justify-center ">
    <ClockLoader color="#ffffff" />
  </div>
  </div>
);
  return <DashboardLayout>{children}</DashboardLayout>;
}