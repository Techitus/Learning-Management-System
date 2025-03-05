import Navbar from '@/components/navbar'
import LessonLists from '@/components/user-lessons'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <LessonLists/>
    </div>
  )
}

export default page