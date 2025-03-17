import CourseList from '@/components/course-list'

const page = () => {
  return (
    <div>

    <CourseList showBuyButton={false} routePrefix='mycourses'  disableNavigation={false} showStudentCourses={true} showTeacherCourses={false} />
    </div>
  )
}

export default page
