/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, FileIcon, Loader2 } from "lucide-react"
import qr from "@/Images/myqr.jpeg"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Clock, Tag, User, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCourses } from "@/store/courses/courseSlice";
import { fetchCategories } from "@/store/category/categorySlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createEnrollment, fetchEnrollments } from "@/store/enrollements/enrollementSlice";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { Status } from "@/types/status.types";
import { EnrollmentStatus } from "@/database/models/enrolement.schema";
import { ClockLoader } from "react-spinners";

type Mentor = {
  _id: string;
  username: string;
};

type Category = {
  _id: string;
  name: string;
};

type ICourses = {
  _id?: string;
  courseName: string;
  coursePrice: string;
  courseDescription: string;
  courseDuration: string;
  category: Category;
  mentor: Mentor;
  thumbnail: any;
};

type CoursesTeacherProps = {
  showBuyButton: boolean;
  routePrefix?: string;
  disableNavigation?: boolean;
  showStudentCourses?: boolean;
  showTeacherCourses?: boolean;
};
 function CourseList({ showBuyButton = false, routePrefix='courses' ,disableNavigation = false, showStudentCourses=false,showTeacherCourses=true}: CoursesTeacherProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | "none">("none");
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false)
  const { data: session } = useSession();
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setPaymentScreenshot(file)

    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentScreenshot || !whatsappNumber) {
      console.error("Please provide both WhatsApp number and payment screenshot")
      return
    }
      const student = session?.user?.id;
      const course = selectedCourseId;
    
    const formData = new FormData()
    formData.append('whatsapp', whatsappNumber)
    formData.append('paymentVerification', paymentScreenshot)
    formData.append('student', student as string)
    formData.append('course', course as string)
    try {
      setIsSubmitting(true)

      await dispatch(createEnrollment(formData))

      setWhatsappNumber("")
      setPaymentScreenshot(null)
      setPreviewUrl(null)
      setOpen(false)
      toast.success("Course Enrollment Successfully!!!", {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Unable to Enroll...", {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearFile = () => {
    setPaymentScreenshot(null)
    setPreviewUrl(null)
    if (document.getElementById("payment-screenshot") instanceof HTMLInputElement) {
      ;(document.getElementById("payment-screenshot") as HTMLInputElement).value = ""
    }
  }
  const { enrollments } = useAppSelector((state) => state.enrollments);
useEffect(() => {
    dispatch(fetchEnrollments());
  }, [dispatch]); 
   const { courses,status} = useAppSelector((state) => state.courses);
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  
  const { categories } = useAppSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCourses = courses
    .filter((course) =>
      selectedCategory === "all" ? true : course.category.name === selectedCategory
    )
    .sort((a, b) => {
      if (priceSort === "asc") {
        return parseFloat(String(a.coursePrice)) - parseFloat(String(b.coursePrice));
      }
      if (priceSort === "desc") {
        return parseFloat(String(b.coursePrice)) - parseFloat(String(a.coursePrice));
      }
      return 0;
    });
//my courses for student 
const enrolledCourseIds = enrollments
  .filter(
    (enrollment) =>
      enrollment.student._id === session?.user.id &&
      enrollment.enrollmentStatus === EnrollmentStatus.APPROVE
  )
  .map((enrollment) => enrollment.course._id);

const enrolledCourses = courses.filter((course) =>
  enrolledCourseIds.includes(course._id)
);
//my courses for teacher 
const teachersCourse = courses.filter(
  (course) => course.mentor.username === session?.user.name
)
if (status === Status.LOADING) {
  return (
    <div>
<div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-green-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-green-300/10 blur-[100px]" />
            <div className="h-screen flex items-center justify-center ">
      <ClockLoader color="#ffffff" />
    </div>
    </div>
  );
}
const coursesToShow = showStudentCourses ? enrolledCourses: showTeacherCourses? teachersCourse: filteredCourses;
  return (
    
    <div className="container mx-auto py-8">
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4 ">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="xl:w-[180px] cursor-pointer">
              <SelectValue className="cursor-pointer" placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.name} className="cursor-pointer">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceSort} onValueChange={(value: "asc" | "desc" | "none") => setPriceSort(value)}>
            <SelectTrigger className="xl:w-[180px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="none">
                Default
              </SelectItem>
              <SelectItem className="cursor-pointer" value="asc">
                Price: Low to High
              </SelectItem>
              <SelectItem className="cursor-pointer" value="desc">
                Price: High to Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coursesToShow.length > 0 ? (
  coursesToShow.map((course) => (
    <Card key={course._id} className="overflow-hidden">
      <Image
        height={192}
        width={384}
        src={course.thumbnail ? course.thumbnail : "/placeholder.png"}
        alt={course.courseName}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        {!disableNavigation && routePrefix ? (
          <Link href={`${routePrefix}/${course._id}`}>
            <h3 className="text-xl font-semibold cursor-pointer hover:underline">
              {course.courseName}
            </h3>
          </Link>
        ) : (
          <h3 className="text-xl font-semibold">{course.courseName}</h3>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-xs md:text-base text-gray-600 mb-4">{course.courseDescription}</p>
        <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.courseDuration}
          </div>
          <div className="flex items-center ">
            <Tag className="w-4 h-4 mr-1" />
            {course.category.name}
          </div>
          <div className="flex items-center ">
            <User className="w-4 h-4 mr-1" />
            {course.mentor.username}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-lg font-bold">Rs.{course.coursePrice}</p>
        {showBuyButton && (
       <Dialog open={open} onOpenChange={setOpen}>
         {
           enrolledCourses && enrolledCourses.some(enrolledCourse => enrolledCourse._id === course._id) ? (
             <span className="text-gray-600 font-semibold">Enrolled</span>
           ) : (
            <DialogTrigger asChild>

             <Button
               className="flex items-center gap-2"
               onClick={() => {
                 if (!enrolledCourses.some(enrolledCourse => enrolledCourse._id === course._id)) {
                  setSelectedCourseId(course._id);
                   setOpen(true);  

                 }
               }}
             >
               <ShoppingCart className="w-4 h-4" />
               Enroll Now
             </Button>
           
         
       </DialogTrigger>
        )}
       <DialogContent className="w-[90%] sm:max-w-2xl sm:w-[40vw] md:w-[60vw] lg:w-[50vw] px-4 py-6">
  <DialogHeader>
    <DialogTitle>Payment Details</DialogTitle>
    <DialogDescription>
      Scan the QR code to make payment and upload the screenshot
    </DialogDescription>
  </DialogHeader>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex flex-col items-center justify-center">
      <div className="border border-border p-3 rounded-lg mb-2">
        <Image
          src={qr || "/placeholder.svg"}
          alt="Payment QR Code"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Scan this QR code with your payment app
      </p>
    </div>
    <Separator className="my-2" />
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 space-y-1">
        <Label htmlFor="whatsapp" className="text-sm">
          WhatsApp Number
        </Label>
        <Input
          id="whatsapp"
          type="text"
          placeholder="Enter WhatsApp number"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="flex-1 space-y-1">
        <Label htmlFor="payment-screenshot" className="text-sm">
          Payment Screenshot
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="payment-screenshot"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full h-10 flex items-center justify-center gap-2"
            onClick={() =>
              document.getElementById("payment-screenshot")?.click()
            }
            disabled={isSubmitting}
          >
            <FileIcon className="h-4 w-4" />
            {paymentScreenshot ? "File Selected" : "Select File"}
          </Button>
          {paymentScreenshot && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearFile}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
    {previewUrl && (
      <div className="mt-2">
        <Image
          src={previewUrl || "/placeholder.svg"}
          alt="Payment Screenshot Preview"
          width={300}
          height={100}
          className="mx-auto max-h-[100px] w-auto object-contain border rounded-md"
        />
      </div>
    )}
    <div className="flex justify-end mt-2">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </div>
    
  </form>
</DialogContent>

     </Dialog>
     
      
       
       
        )}
      </CardFooter>
    </Card>
  ))
) : (
  <p className="text-center text-gray-600">No courses available.</p>
)}
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />

    </div>
  );
}

export default CourseList;
