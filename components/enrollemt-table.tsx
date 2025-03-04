/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react"
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
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {  changeEnrollmentStatus, deleteEnrollment, fetchEnrollments } from "@/store/enrollements/enrollementSlice"
import { EnrollmentStatus } from "@/database/models/enrolement.schema"
import { StatusSelection } from "./ui/status-selection"
import toast, { Toaster } from "react-hot-toast"
import { Status } from "@/types/status.types"




export function EnrollmentTable() {
  const [selectedEnrollment, setSelectedEnrollment] = useState<typeof enrollments[0] | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPaymentPreviewOpen, setIsPaymentPreviewOpen] = useState(false)
  const [actionType, setActionType] = useState<"deleted" | "changed" | null>(null);

  const { enrollments,status } = useAppSelector((state) => state.enrollments) 
  const dispatch = useAppDispatch()
  
    useEffect(() => {
      dispatch(fetchEnrollments())
    }, [dispatch])
  

  const openPreview = (enrollment: typeof enrollments[0]) => {
    setSelectedEnrollment(enrollment)
    setIsPreviewOpen(true)
  }

  const openPaymentPreview = (enrollment: typeof enrollments[0]) => {
    setSelectedEnrollment(enrollment)
    setIsPaymentPreviewOpen(true)
  }

  const openDeleteDialog = (enrollment: typeof enrollments[0]) => {
    setSelectedEnrollment(enrollment)
    setIsDeleteDialogOpen(true)
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case EnrollmentStatus.APPROVE:
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Approved</Badge>
      case EnrollmentStatus.PENDING:
        return <Badge variant="warning" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>
      case EnrollmentStatus.REJECTED:
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  const handleChangeStatus = (status: EnrollmentStatus, id: string) => {
    dispatch(changeEnrollmentStatus(status, id));
    setIsPaymentPreviewOpen(false);
    setActionType("changed"); 
};
const handleDelete = (id: string) => {
  dispatch(deleteEnrollment(id));
  setIsDeleteDialogOpen(false);
  setActionType("deleted"); 
};
useEffect(() => {
  if (status === Status.SUCCESS && actionType) {
      toast.success(
          actionType === "deleted"
              ? "Enrollment deleted successfully!"
              : "Status changed successfully!",
          {
              style: {
                  borderRadius: "10px",
                  background: "#000",
                  color: "#fff",
              },
          }
      );
      setActionType(null); 
  }
}, [status, actionType]);


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
            {enrollments?.map((enrollment) =>enrollment?.student && (
              <TableRow key={enrollment._id}>
                <TableCell>
                  <Avatar>
                  <AvatarImage 
  src={enrollment?.student?.profileImage || "/default-avatar.png"} 
  alt={enrollment?.student?.username || "Unknown"} 
/>                    <AvatarFallback>{enrollment.student.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    {enrollment.student.username}
                    <div className="text-sm text-muted-foreground">{enrollment.student.email}</div>
                  </div>
                </TableCell>
                <TableCell>{enrollment.course.courseName}</TableCell>
                <TableCell> {new Date(enrollment.enrollAt).toLocaleDateString()}</TableCell>
                <TableCell>Rs.{enrollment.course.coursePrice}</TableCell>
                <TableCell>
                  {getStatusBadge(enrollment.enrollmentStatus)}
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
                  <AvatarImage src={selectedEnrollment?.student.profileImage} alt={selectedEnrollment.student.username} />
                  <AvatarFallback className="text-xl">
                    {selectedEnrollment.student.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">{selectedEnrollment.student.username}</h3>
                  <p className="text-muted-foreground">{selectedEnrollment.student.email}</p>
                </div>
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Course:</p>
                  <p className="text-sm">{selectedEnrollment.course.courseName}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Enrollment Date:</p>
                  <p className="text-sm"> {new Date(selectedEnrollment.enrollAt).toLocaleDateString()}</p> 
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Amount:</p>
                  <p className="text-sm">Rs.{selectedEnrollment.course.coursePrice}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm font-medium">Status:</p>
                  <div>{getStatusBadge(selectedEnrollment.enrollmentStatus)}</div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={isPaymentPreviewOpen} onOpenChange={setIsPaymentPreviewOpen}>
      {selectedEnrollment && (
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Verification</DialogTitle>
            <DialogDescription>
              Payment screenshot for {selectedEnrollment.course.courseName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 py-4">
            <div className="relative w-72 h-[500px] rounded-[45px] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)] border-8 border-zinc-900 ml-1">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[90px] h-[22px] bg-zinc-900 rounded-full z-20" />
              <div className="absolute -inset-[1px] border-[3px] border-zinc-700 border-opacity-40 rounded-[37px] pointer-events-none" />
              <div className="relative w-full h-full rounded-[37px] overflow-hidden flex items-center justify-center bg-zinc-900/10">
                <img
                  src={selectedEnrollment.paymentVerification}
                  alt="Payment Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-[-12px] top-20 w-[6px] h-8 bg-zinc-900 rounded-l-md shadow-md" />
              <div className="absolute left-[-12px] top-32 w-[6px] h-10 bg-zinc-900 rounded-l-md shadow-md" />
              <div className="absolute left-[-12px] top-44 w-[6px] h-10 bg-zinc-900 rounded-l-md shadow-md" />
              <div className="absolute right-[-12px] top-32 w-[6px] h-14 bg-zinc-900 rounded-r-md shadow-md" />
            </div>
            
            <div className=" p-6 rounded-lg shadow-lg">
  <h2 className=" font-bold text-center text-white/90 mb-4">Personal Information</h2>
  <div className="w-full space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <p className="text-sm font-medium text-white">Student:</p>
      <p className="text-sm text-white">{selectedEnrollment.student.username}</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <p className="text-sm font-medium text-white">Course:</p>
      <p className="text-sm text-white">{selectedEnrollment.course.courseName}</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <p className="text-sm font-medium text-white">Whatsapp:</p>
      <p className="text-sm text-white">{selectedEnrollment.whatsapp}</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <p className="text-sm font-medium text-white">Amount:</p>
      <p className="text-sm text-white">Rs.{selectedEnrollment.course.coursePrice}</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <p className="text-sm font-medium text-white">Status:</p>
      <div>{getStatusBadge(selectedEnrollment.enrollmentStatus)}</div>
      
    </div>
    
    <StatusSelection handleClick={(status: EnrollmentStatus) => handleChangeStatus(status, selectedEnrollment?._id || "")} 
 />

  </div>

</div>

          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <div className="flex gap-2">
              
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
                  for <span className="font-medium">{selectedEnrollment.student.username}</span> of course{" "}
                  <span className="font-medium">{selectedEnrollment.course.courseName}</span>
                </>
              )}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
            key={selectedEnrollment?._id}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => handleDelete(selectedEnrollment?._id ?? '')}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  )
}