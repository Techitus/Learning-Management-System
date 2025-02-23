/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { CalendarIcon, MailIcon, PhoneIcon, MoreVertical } from 'lucide-react'
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

interface User {
  id: number
  name: string
  image: string
  joinedDate: string
  email: string
  mobile: string
  courses: string[]
  isTeacher?: boolean
}

interface UserCardProps {
  users: User[]
}

export default function UserCard({ users }: UserCardProps) {
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [dateSort, setDateSort] = useState<"latest" | "oldest" | "none">("none")
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; userId: number | null }>({ isOpen: false, userId: null })
  const [promoteConfirmation, setPromoteConfirmation] = useState<{ isOpen: boolean; userId: number | null }>({ isOpen: false, userId: null })
  const [confirmationInput, setConfirmationInput] = useState("")

  const targetUser = deleteConfirmation.userId !== null 
    ? users.find(u => u.id === deleteConfirmation.userId) 
    : promoteConfirmation.userId !== null 
      ? users.find(u => u.id === promoteConfirmation.userId)
      : null

  const allCourses = Array.from(
    new Set(users.flatMap(user => user.courses))
  ).sort()

  const applyFilters = () => {
    let sorted = [...users]

    if (selectedCourse !== "all") {
      sorted = sorted.filter((user) => user.courses.includes(selectedCourse))
    }
    
    if (dateSort !== "none") {
      sorted.sort((a, b) =>
        dateSort === "latest"
          ? new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
          : new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime()
      )
    }

    setFilteredUsers(sorted)
  }

  useEffect(() => {
    applyFilters()
  }, [users, selectedCourse, dateSort]) 

  const handleDeleteUser = (userId: number) => {
    const userToDelete = users.find(user => user.id === userId)
    if (userToDelete && confirmationInput === userToDelete.name) {
      setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
      setDeleteConfirmation({ isOpen: false, userId: null })
      setConfirmationInput("")
    }
  }

  const handlePromoteUser = (userId: number) => {
    if (confirmationInput === "Teacher") {
      setFilteredUsers(prevUsers => prevUsers.map(user => 
        user.id === userId ? { ...user, isTeacher: true } : user
      ))
      setPromoteConfirmation({ isOpen: false, userId: null })
      setConfirmationInput("")
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <Select value={selectedCourse} onValueChange={(value) => {
          setSelectedCourse(value)
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="all">All Courses</SelectItem>
            {allCourses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={dateSort} 
          onValueChange={(value: "latest" | "oldest" | "none") => {
            setDateSort(value)
          }}
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
          <div key={user.id} className="bg-black/80 shadow-md rounded-lg overflow-hidden text-white relative">
            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setDeleteConfirmation({ isOpen: true, userId: user.id })}>
                    Delete User
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setPromoteConfirmation({ isOpen: true, userId: user.id })}>
                    Promote as Teacher
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <div className="flex items-center text-sm text-gray-400">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <MailIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{user.mobile}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Courses:</h3>
                <div className="flex flex-wrap gap-2">
                  {user.courses.map((course, index) => (
                    <span 
                      key={index} 
                      className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                        selectedCourse === course
                          ? "bg-gray-600 text-blue-50"
                          : "bg-gray-900 text-blue-100"
                      }`}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
              {user.isTeacher && (
                <div className="mt-2 text-sm font-semibold text-green-400">
                  Teacher
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={deleteConfirmation.isOpen} onOpenChange={(isOpen) => {
        setDeleteConfirmation({ isOpen, userId: isOpen ? deleteConfirmation.userId : null })
        if (!isOpen) setConfirmationInput("")
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Please type <strong>"{targetUser?.name}"</strong> to confirm.
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
                placeholder={`Type "${targetUser?.name}" to confirm`}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => deleteConfirmation.userId && handleDeleteUser(deleteConfirmation.userId)}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={promoteConfirmation.isOpen} onOpenChange={(isOpen) => {
        setPromoteConfirmation({ isOpen, userId: isOpen ? promoteConfirmation.userId : null })
        if (!isOpen) setConfirmationInput("")
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote user to Teacher</DialogTitle>
            <DialogDescription>
              Please type <strong>"Teacher"</strong> to confirm promotion for user <strong>"{targetUser?.name}"</strong>.
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
            <Button onClick={() => promoteConfirmation.userId && handlePromoteUser(promoteConfirmation.userId)}>
              Promote to Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}