/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { DashboardLayout } from '@/components/layout/admin-dashboard-layout';
import { Role } from '@/database/models/user.schema';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
  return <DashboardLayout>{children}</DashboardLayout>;
}