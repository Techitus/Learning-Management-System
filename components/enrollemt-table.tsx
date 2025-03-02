/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock 
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for demonstration
const mockEnrollments = [
  {
    id: "1",
    studentName: "John Doe",
    studentEmail: "john.doe@example.com",
    username: "johndoe",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
    courseName: "Web Development Bootcamp",
    enrollmentDate: "2025-04-10",
    status: "verified",
    paymentScreenshot: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    amount: "$499.99"
  },
  {
    id: "2",
    studentName: "Jane Smith",
    studentEmail: "jane.smith@example.com",
    username: "janesmith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    courseName: "Data Science Fundamentals",
    enrollmentDate: "2025-04-08",
    status: "pending",
    paymentScreenshot: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    amount: "$349.99"
  },
  {
    id: "3",
    studentName: "Robert Johnson",
    studentEmail: "robert.johnson@example.com",
    username: "robertj",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    courseName: "Mobile App Development",
    enrollmentDate: "2025-04-05",
    status: "cancelled",
    paymentScreenshot: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=600&fit=crop",
    amount: "$399.99"
  },
  {
    id: "4",
    studentName: "Emily Davis",
    studentEmail: "emily.davis@example.com",
    username: "emilyd",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    courseName: "UI/UX Design Masterclass",
    enrollmentDate: "2025-04-12",
    status: "verified",
    paymentScreenshot: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    amount: "$299.99"
  },
  {
    id: "5",
    studentName: "Michael Wilson",
    studentEmail: "michael.wilson@example.com",
    username: "michaelw",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    courseName: "Artificial Intelligence Basics",
    enrollmentDate: "2025-04-01",
    status: "pending",
    paymentScreenshot: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=800&h=600&fit=crop",
    amount: "$549.99"
  },
]

type EnrollmentStatus = "pending" | "verified" | "cancelled";

export function EnrollmentTable() {
  const [enrollments, setEnrollments] = useState(mockEnrollments)
  const [selectedEnrollment, setSelectedEnrollment] = useState<typeof mockEnrollments[0] | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPaymentPreviewOpen, setIsPaymentPreviewOpen] = useState(false)

  const handleStatusChange = (enrollmentId: string, newStatus: EnrollmentStatus) => {
    setEnrollments(
      enrollments.map((enrollment) =>
        enrollment.id === enrollmentId ? { ...enrollment, status: newStatus } : enrollment
      )
    )
  }

  const handleDeleteEnrollment = (enrollmentId: string) => {
    setEnrollments(enrollments.filter((enrollment) => enrollment.id !== enrollmentId))
    setIsDeleteDialogOpen(false)
  }

  const openPreview = (enrollment: typeof mockEnrollments[0]) => {
    setSelectedEnrollment(enrollment)
    setIsPreviewOpen(true)
  }

  const openPaymentPreview = (enrollment: typeof mockEnrollments[0]) => {
    setSelectedEnrollment(enrollment)
    setIsPaymentPreviewOpen(true)
  }

  const openDeleteDialog = (enrollment: typeof mockEnrollments[0]) => {
    setSelectedEnrollment(enrollment)
    setIsDeleteDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Verified</Badge>
      case "pending":
        return <Badge variant="warning" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>
      case "cancelled":
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Student</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={enrollment.avatar} alt={enrollment.studentName} />
                    <AvatarFallback>{enrollment.studentName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    {enrollment.studentName}
                    <div className="text-sm text-muted-foreground">@{enrollment.username}</div>
                  </div>
                </TableCell>
                <TableCell>{enrollment.courseName}</TableCell>
                <TableCell>{formatDate(enrollment.enrollmentDate)}</TableCell>
                <TableCell>{enrollment.amount}</TableCell>
                <TableCell>
                  <Select 
                    defaultValue={enrollment.status}
                    onValueChange={(value) => handleStatusChange(enrollment.id, value as EnrollmentStatus)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue>
                        {getStatusBadge(enrollment.status)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <Badge variant="warning" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Pending
                        </Badge>
                      </SelectItem>
                      <SelectItem value="verified">
                        <Badge variant="success" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Verified
                        </Badge>
                      </SelectItem>
                      <SelectItem value="cancelled">
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> Cancelled
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openPaymentPreview(enrollment)}
                      title="View payment screenshot"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openPreview(enrollment)}
                      title="Preview enrollment details"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteDialog(enrollment)}
                      className="text-destructive hover:bg-destructive/10"
                      title="Delete enrollment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Enrollment Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        {selectedEnrollment && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enrollment Details</DialogTitle>
              <DialogDescription>
                View complete enrollment information.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedEnrollment.avatar} alt={selectedEnrollment.studentName} />
                  <AvatarFallback className="text-xl">
                    {selectedEnrollment.studentName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">{selectedEnrollment.studentName}</h3>
                  <p className="text-muted-foreground">@{selectedEnrollment.username}</p>
                  <p className="text-sm">{selectedEnrollment.studentEmail}</p>
                </div>
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Course:</p>
                  <p className="text-sm">{selectedEnrollment.courseName}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Enrollment Date:</p>
                  <p className="text-sm">{formatDate(selectedEnrollment.enrollmentDate)}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Amount:</p>
                  <p className="text-sm">{selectedEnrollment.amount}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Status:</p>
                  <div>{getStatusBadge(selectedEnrollment.status)}</div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Payment Screenshot Preview */}
      <Dialog open={isPaymentPreviewOpen} onOpenChange={setIsPaymentPreviewOpen}>
        {selectedEnrollment && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Payment Verification</DialogTitle>
              <DialogDescription>
                Payment screenshot for {selectedEnrollment.courseName}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="rounded-md overflow-hidden border">
                <img 
                  src={selectedEnrollment.paymentScreenshot} 
                  alt="Payment Screenshot" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Student:</p>
                  <p className="text-sm">{selectedEnrollment.studentName}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Course:</p>
                  <p className="text-sm">{selectedEnrollment.courseName}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Amount:</p>
                  <p className="text-sm">{selectedEnrollment.amount}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Status:</p>
                  <div>{getStatusBadge(selectedEnrollment.status)}</div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    handleStatusChange(selectedEnrollment.id, "verified");
                    setIsPaymentPreviewOpen(false);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Verify Payment
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    handleStatusChange(selectedEnrollment.id, "cancelled");
                    setIsPaymentPreviewOpen(false);
                  }}
                >
                  Reject
                </Button>
              </div>
              <Button variant="outline" onClick={() => setIsPaymentPreviewOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the enrollment record
              {selectedEnrollment && (
                <>
                  {" "}
                  for <span className="font-medium">{selectedEnrollment.studentName}</span> in{" "}
                  <span className="font-medium">{selectedEnrollment.courseName}</span>
                </>
              )}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => selectedEnrollment && handleDeleteEnrollment(selectedEnrollment.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}