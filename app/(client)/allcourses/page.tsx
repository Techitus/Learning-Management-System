import CoursesTeacher from '@/app/(dashboard)/teacher/courses/page'
import Navbar from '@/components/navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
        <CoursesTeacher showBuyButton={true}/>
    </div>
  )
}

export default page