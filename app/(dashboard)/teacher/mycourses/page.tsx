import CourseList from '@/components/course-list'
import React from 'react'

const page = () => {
  return (
    <div>
      <CourseList showBuyButton={false} showTeacherCourses={true}/>
    </div>
  )
}

export default page