/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import CourseList from "@/components/course-list";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const page = () => {
  const { data: session, status, update } = useSession();
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  
  useEffect(() => {
    const verifySession = async () => {
      if (status === "authenticated") {
        update();
        setIsSessionVerified(true);
      }
    };
    
    verifySession();
    
    window.addEventListener('focus', verifySession);
    return () => window.removeEventListener('focus', verifySession);
  }, [status, update]);

  return (
    <div>
      <Navbar />
      <CourseList 
        showBuyButton={true}
        disableNavigation={true}
        showStudentCourses={false}
        showTeacherCourses={false}
      />
    </div>
  );
};

export default page;