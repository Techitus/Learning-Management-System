import React from 'react'
import CourseList from '../mycourses/page'

const page = () => {
  return (
    <div>
    <CourseList showBuyButton={false} disableNavigation={true}  />
    </div>
  )
}

export default page