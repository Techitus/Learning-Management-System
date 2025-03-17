'use client'
import CourseList from "@/components/course-list";

const page = () => {


  return (
    <div>
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