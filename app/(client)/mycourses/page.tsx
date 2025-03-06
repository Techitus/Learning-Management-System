import CourseList from '@/app/(dashboard)/teacher/mycourses/page'
import Navbar from '@/components/navbar'
import React from 'react'

const page = () => {
  return (
    <div>

        <Navbar/>
    <CourseList showBuyButton={false} routePrefix='mycourses'  disableNavigation={false} showStudentCourses={true} showTeacherCourses={false} />
    </div>
  )
}

export default page
