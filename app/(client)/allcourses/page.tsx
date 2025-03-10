import CourseList from '@/app/(dashboard)/teacher/mycourses/page'
import Navbar from '@/components/navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
        <CourseList showBuyButton={true}  disableNavigation={true} showStudentCourses={false} showTeacherCourses={false}/>
        
    </div>
  )
}

export default page