/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import CourseList from "@/app/(dashboard)/teacher/mycourses/page";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// In allcourses/page.js
const page = () => {
  const { data: session, status, update } = useSession();
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  
  useEffect(() => {
    // Verify session on mount and page focus
    const verifySession = async () => {
      if (status === "authenticated") {
        // Force session refresh without the prop
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