/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Clock, Tag, FilePenLine, Trash2, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories } from "@/store/category/categorySlice";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  fetchCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from "@/store/courses/courseSlice";
import { Status } from "@/types/status.types";
import toast, { Toaster } from "react-hot-toast";
import { Role } from "@/database/models/user.schema";
import { fetchUsers } from "@/store/users/userSlice";

const formSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  coursePrice: z.string().min(1, "Price is required"),
  courseDescription: z.string().min(1, "Description is required"),
  courseDuration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
  mentor: z.string().min(1, "Mentor is required"),
  thumbnail: z.instanceof(File, { message: "Image is required" }).optional(),
});

type Mentor = {
  _id: string,
  username: string
}

type Category = {
  _id: string,
  name: string
}

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

export default function Home() {
  const { categories } = useAppSelector((state) => state.categories);
  const { courses, status } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<ICourses | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | "none">("none");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
   
    dispatch(fetchCategories());
    dispatch(fetchCourses());
    dispatch(fetchUsers());
  }, [dispatch]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      coursePrice: "",
      courseDescription: "",
      courseDuration: "",
      category: "",
      mentor: "",
    },
  });

  useEffect(() => {
    if (status === Status.SUCCESS && isSubmitting) {
      
      setIsDialogOpen(false);
      setIsEditing(false);
      setEditingCourse(null);
      form.reset();
      setImagePreview(null);
      setIsSubmitting(false);
      
      
      toast.success(isEditing ? "Course updated successfully!" : "Course created successfully!", {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
      
      
      dispatch(fetchCourses());
    } else if (status === Status.ERROR && isSubmitting) {
      setIsSubmitting(false);
      
      toast.error("Something went wrong. Please try again.", {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
    }
  }, [status, isSubmitting, dispatch, form, isEditing]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      form.setValue("thumbnail", file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenDialog = () => {
    setIsEditing(false);
    form.reset();
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (course: ICourses) => {
    setIsEditing(true);
    setEditingCourse(course);
    
    form.reset({
      courseName: course.courseName,
      coursePrice: course.coursePrice,
      courseDescription: course.courseDescription,
      courseDuration: course.courseDuration,
      category: course.category._id,
      mentor: course.mentor._id,
    });
    
    setImagePreview(course.thumbnail);
    setIsDialogOpen(true);
  };

  const handleDelete = (courseId: string) => {
    dispatch(deleteCourse(courseId));
    setDeleteConfirmName("");
    
    toast.success("Course deleted successfully!", {
      style: {
        borderRadius: "10px",
        background: "#000",
        color: "#fff",
      },
    });
    
    setTimeout(() => {
      dispatch(fetchCourses());
    }, 200);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("courseName", values.courseName);
    formData.append("coursePrice", values.coursePrice);
    formData.append("courseDescription", values.courseDescription);
    formData.append("courseDuration", values.courseDuration);
    formData.append("category", values.category);
    formData.append("mentor", values.mentor);
    
    if (values.thumbnail instanceof File) {
      formData.append("thumbnail", values.thumbnail);
    }
    
    if (isEditing && editingCourse?._id) {
      formData.append("_id", editingCourse._id);
      dispatch(updateCourse(editingCourse._id,formData as any));
    } else {
      dispatch(createCourse(formData as any));
    }
  };

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

  const {users} = useAppSelector((state) => state.users);
  const mentors = users.filter((user) => user.role === Role.Teacher);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4 items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceSort} onValueChange={(value: "asc" | "desc" | "none") => setPriceSort(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Default</SelectItem>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          
          
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) {
            setIsEditing(false);
            setIsDialogOpen(false);
            setEditingCourse(null);
            form.reset();
            setImagePreview(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Course' : 'Add New Course'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coursePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="999"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mentor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mentor</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mentor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mentors.map((mentor) => (
                            <SelectItem key={mentor._id} value={mentor._id}>
                              {mentor.username}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          {...field}
                        />
                      </FormControl>
                      {imagePreview && (
                        <div className="mt-2">
                          <Image 
                            src={imagePreview} 
                            alt="Preview" 
                            height={100} 
                            width={200} 
                            className="object-cover rounded" 
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courseDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter course description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courseDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12 weeks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting || status === Status.LOADING}
                >
                  {isSubmitting ? 'Please wait...' : isEditing ? 'Update Course' : 'Add Course'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? filteredCourses.map((course) => (
          <Card key={course._id} className="overflow-hidden">
            <Image 
              height={192}
              width={384}
              src={course.thumbnail ? course.thumbnail : '/placeholder.png'}
              alt={course.courseName}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <h3 className="text-xl font-semibold">{course.courseName}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{course.courseDescription}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.courseDuration}
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {course.category.name}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {course.mentor.username}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-lg font-bold">Rs.{course.coursePrice}</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(course)}
                >
                  <FilePenLine className="h-4 w-4 opacity-80" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500 opacity-80" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Please type "{course.courseName}" to confirm deletion.
                        <Input
                          className="mt-2"
                          value={deleteConfirmName}
                          onChange={(e) => setDeleteConfirmName(e.target.value)}
                          placeholder="Type course name to confirm"
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setDeleteConfirmName("")}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(course._id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                        disabled={deleteConfirmName !== course.courseName}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        )) : (
          <div className="col-span-3 flex items-center justify-center py-12">
            <p className="text-gray-600">No courses found.</p>
          </div>
        )}
      </div>
      <Toaster  position="bottom-right"
  reverseOrder={false} />
    </div>
  );
}