/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { TeacherDashboardLayout } from '@/components/layout/teacher-dashboard-layout';
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
      }if(!session || session.user.role !== Role.Teacher){
       
        router.push('/unauthorized')
  
      }
  
   },[session,status])
  return <TeacherDashboardLayout>{children}</TeacherDashboardLayout>;
}