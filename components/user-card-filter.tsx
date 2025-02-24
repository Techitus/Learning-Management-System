/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { CalendarIcon, MailIcon, PhoneIcon, MoreVertical, User } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchCategories } from "@/store/category/categorySlice"
import { deleteUserById, promoteToTeacher } from "@/store/users/userSlice"
import { Role } from "@/database/models/user.schema"
import toast, { Toaster } from "react-hot-toast"

interface ICategory {
  _id: string;
  name: string;
}

interface IUser {
  _id: string;
  username: string;
  profileImage: string;
  email: string;
  role: Role;
  mobile?: string;
  courses?: string[];
  createdAt: string;
}

interface UserCardProps {
  users: IUser[];
}

export default function UserCard({ users }: UserCardProps) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  
 
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [dateSort, setDateSort] = useState<"latest" | "oldest" | "none">("none");
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; userId: string | null }>({ isOpen: false, userId: null });
  const [promoteConfirmation, setPromoteConfirmation] = useState<{ isOpen: boolean; userId: string | null }>({ isOpen: false, userId: null });
  const [confirmationInput, setConfirmationInput] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
   
    setFilteredUsers(Array.isArray(users) ? users : []);
  }, [users]);

  const targetUser = Array.isArray(users) ? users.find(u => 
    u._id === (deleteConfirmation.userId || promoteConfirmation.userId)
  ) : null;

  const applyFilters = () => {
    if (!Array.isArray(users)) {
      setFilteredUsers([]);
      return;
    }

    let sorted = [...users];

    if (selectedCourse !== "all") {
      sorted = sorted.filter(user => 
        user.courses?.includes(selectedCourse)
      );
    }

    if (dateSort !== "none") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateSort === "latest" ? dateB - dateA : dateA - dateB;
      });
    }

    setFilteredUsers(sorted);
  };

  useEffect(() => {
    applyFilters();
  }, [users, selectedCourse, dateSort]);

  const handleDeleteUser = async (userId: string) => {
    const userToDelete = users.find(user => user._id === userId);
    if (userToDelete && confirmationInput === userToDelete.username) {
      await dispatch(deleteUserById(userId));
      toast.success("User deleted successfully!", {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
      setDeleteConfirmation({ isOpen: false, userId: null });
      setConfirmationInput("");
    }
  };

  const handlePromoteUser = async (userId: string) => {
    if (confirmationInput === "Teacher") {
      await dispatch(promoteToTeacher(userId));
      toast.success("Promoted to Teacher successfully!", {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
      setPromoteConfirmation({ isOpen: false, userId: null });
      setConfirmationInput("");
    }
  };

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <Select 
          value={selectedCourse} 
          onValueChange={(value) => setSelectedCourse(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {categories.map((category: ICategory) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={dateSort} 
          onValueChange={(value: "latest" | "oldest" | "none") => setDateSort(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by Join Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Default</SelectItem>
            <SelectItem value="latest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-black/80 shadow-md rounded-lg overflow-hidden text-white relative">
            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onSelect={() => setDeleteConfirmation({ isOpen: true, userId: user._id })}
                  >
                    Delete User
                  </DropdownMenuItem>
                  {user.role !== Role.Teacher && (
                    <DropdownMenuItem 
                      onSelect={() => setPromoteConfirmation({ isOpen: true, userId: user._id })}
                    >
                      Promote as Teacher
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={user.profileImage || "/placeholder.svg"}
                  alt={user.username}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold">{user.username}</h2>
                  <div className="flex justify-around space-x-10">
  <div className="flex items-center text-sm text-gray-400">
    <CalendarIcon className="w-4 h-4 mr-1" />
    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
  </div>
  
</div>

                </div>
              </div>
              <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-400 ">
    <User className="w-4 h-4 mr-1" />
    <span>{user.role === Role.Teacher
        ? "Teacher"
        : user.role === Role.Admin
        ? "Admin"
        : "Student"}</span>
  </div>
                <div className="flex items-center text-sm">
                  <MailIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                
                  <div className="flex items-center text-sm">
                    <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {user.mobile ? (
                    <span>{user.mobile}</span>
                  ):
                  <span>Not available</span>
                }
                  </div>
                

              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Courses:</h3>
                <div className="flex flex-wrap gap-2">
                  {user.courses?.map((courseId) => {
                    const category = categories.find(c => c._id === courseId);
                    return (
                      <span 
                        key={courseId} 
                        className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                          selectedCourse === courseId
                            ? "bg-gray-600 text-blue-50"
                            : "bg-gray-900 text-blue-100"
                        }`}
                      >
                        {category?.name || 'Unknown Course'}
                      </span>
                    );
                  })}
                </div>
              </div>
             
            </div>
          </div>
        ))}
      </div>

      <Dialog 
        open={deleteConfirmation.isOpen} 
        onOpenChange={(isOpen) => {
          setDeleteConfirmation({ isOpen, userId: isOpen ? deleteConfirmation.userId : null });
          if (!isOpen) setConfirmationInput("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Please type <strong>"{targetUser?.username}"</strong> to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                className="col-span-3"
                placeholder={`Type "${targetUser?.username}" to confirm`}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="destructive" 
              onClick={() => deleteConfirmation.userId && handleDeleteUser(deleteConfirmation.userId)}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog 
        open={promoteConfirmation.isOpen} 
        onOpenChange={(isOpen) => {
          setPromoteConfirmation({ isOpen, userId: isOpen ? promoteConfirmation.userId : null });
          if (!isOpen) setConfirmationInput("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote user to Teacher</DialogTitle>
            <DialogDescription>
              Please type <strong>"Teacher"</strong> to confirm promotion for user <strong>"{targetUser?.username}"</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm" className="text-right">
                Confirm
              </Label>
              <Input
                id="confirm"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                className="col-span-3"
                placeholder='Type "Teacher" to confirm'
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => promoteConfirmation.userId && handlePromoteUser(promoteConfirmation.userId)}
            >
              Promote to Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}