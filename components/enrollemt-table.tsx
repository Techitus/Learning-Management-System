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
import { changeEnrollmentStatus, deleteEnrollment, fetchEnrollments } from "@/store/enrollements/enrollementSlice"
import { EnrollmentStatus } from "@/database/models/enrolement.schema"
import { StatusSelection } from "./ui/status-selection"
import toast, { Toaster } from "react-hot-toast"
import { Status } from "@/types/status.types"
import { useSession } from "next-auth/react"

type EnrollmentTableProps ={
    isAdmin? : boolean
}
export function EnrollmentTable({isAdmin = true}: EnrollmentTableProps){
  const [selectedEnrollment, setSelectedEnrollment] = useState<typeof enrollments[0] | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPaymentPreviewOpen, setIsPaymentPreviewOpen] = useState(false)
  const [actionType, setActionType] = useState<"deleted" | "changed" | null>(null)
const {data:session} = useSession()
  const { enrollments, status } = useAppSelector((state) => state.enrollments) 
  const dispatch = useAppDispatch()
  const filteredEnrollments = isAdmin ? enrollments : enrollments?.filter(enrollment => enrollment.student._id === session?.user?.id);

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
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Student</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Course</TableHead>
              <TableHead className="hidden xl:table-cell">Enrollment Date</TableHead>
              <TableHead className="hidden md:table-cell">Amount</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
             
                  <TableHead className="text-right">Actions</TableHead>
                
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnrollments?.map((enrollment) => enrollment?.student && (
              <TableRow key={enrollment._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage 
                      src={enrollment?.student?.profileImage || "/default-avatar.png"} 
                      alt={enrollment?.student?.username || "Unknown"} 
                    />
                    <AvatarFallback>{enrollment.student.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    {enrollment.student.username}
                    <div className="text-sm text-muted-foreground truncate max-w-[140px] md:max-w-full">{enrollment.student.email}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{enrollment.course.courseName}</TableCell>
                <TableCell className="hidden xl:table-cell">{typeof window !== "undefined" ? new Date(enrollment.enrollAt).toLocaleDateString() : ""}       </TableCell>
                <TableCell className="hidden md:table-cell">Rs.{enrollment.course.coursePrice}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {getStatusBadge(enrollment.enrollmentStatus)}
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 md:gap-2">
                  {
      isAdmin && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openPaymentPreview(enrollment)}
                      title="View payment screenshot"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                )}
                    <Button
  variant="outline"
  size="icon"
  onClick={() => openPreview(enrollment)}
  title="Preview enrollment details"
  className={`${isAdmin ? 'hidden' : 'flex'} md:flex`}
>

                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    {
      isAdmin && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteDialog(enrollment)}
                      className="text-destructive hover:bg-destructive/10"
                      title="Delete enrollment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    )}
                  </div>
                </TableCell>
      
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
     
     

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        {selectedEnrollment && (
          <DialogContent className="xl:w-[95vw] w-[80%] max-w-md mx-auto sm:h-auto h-[80vh] sm:max-h-none max-h-full overflow-hidden">
            <DialogHeader>
              <DialogTitle>Enrollment Details</DialogTitle>
              <DialogDescription>
                View complete enrollment information.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4 overflow-y-auto max-h-[calc(80vh-10rem)] sm:max-h-none">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 md:h-16 md:w-16">
                  <AvatarImage src={selectedEnrollment?.student.profileImage} alt={selectedEnrollment.student.username} />
                  <AvatarFallback className="text-lg md:text-xl">
                    {selectedEnrollment.student.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-base md:text-lg font-bold">{selectedEnrollment.student.username}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{selectedEnrollment.student.email}</p>
                </div>
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-xs md:text-sm font-medium">Course:</p>
                  <p className="text-xs md:text-sm">{selectedEnrollment.course.courseName}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-xs md:text-sm font-medium">Enrollment Date:</p>
                  <p className="text-xs md:text-sm">{new Date(selectedEnrollment.enrollAt).toLocaleDateString()}</p> 
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-xs md:text-sm font-medium">Amount:</p>
                  <p className="text-xs md:text-sm">Rs.{selectedEnrollment.course.coursePrice}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-xs md:text-sm font-medium">Status:</p>
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
      {
      isAdmin && (
        <div>
      <Dialog open={isPaymentPreviewOpen} onOpenChange={setIsPaymentPreviewOpen}>
        {selectedEnrollment && (
          <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl mx-auto sm:h-auto h-[95vh] sm:max-h-none max-h-full overflow-hidden">
          <DialogHeader>
            <DialogTitle>Payment Verification</DialogTitle>
            <DialogDescription>
              Payment screenshot for {selectedEnrollment.course.courseName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-4 py-4 overflow-y-auto max-h-[calc(95vh-10rem)] sm:max-h-none">
            <div className="relative w-full md:w-64 lg:w-72 h-64 md:h-[500px] rounded-[30px] md:rounded-[45px] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)] border-4 md:border-8 border-zinc-900 mx-auto md:ml-1 flex-shrink-0">
              <div className="absolute top-1 md:top-2 left-1/2 transform -translate-x-1/2 w-[60px] md:w-[90px] h-[15px] md:h-[22px] bg-zinc-900 rounded-full z-20" />
              <div className="absolute -inset-[1px] border-[2px] md:border-[3px] border-zinc-700 border-opacity-40 rounded-[26px] md:rounded-[37px] pointer-events-none" />
              <div className="relative w-full h-full rounded-[26px] md:rounded-[37px] overflow-hidden flex items-center justify-center bg-zinc-900/10">
                <img
                  src={selectedEnrollment.paymentVerification}
                  alt="Payment Screenshot"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden md:block absolute left-[-12px] top-20 w-[6px] h-8 bg-zinc-900 rounded-l-md shadow-md" />
              <div className="hidden md:block absolute left-[-12px] top-32 w-[6px] h-10 bg-zinc-900 rounded-l-md shadow-md" />
              <div className="hidden md:block absolute left-[-12px] top-44 w-[6px] h-10 bg-zinc-900 rounded-l-md shadow-md" />
              <div className="hidden md:block absolute right-[-12px] top-32 w-[6px] h-14 bg-zinc-900 rounded-r-md shadow-md" />
            </div>
            
            <div className="p-3 md:p-6 rounded-lg shadow-lg flex-grow">
              <h2 className="text-sm md:text-base font-bold text-center text-white/90 mb-2 md:mb-4">Personal Information</h2>
              <div className="w-full space-y-2 md:space-y-4">
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <p className="text-xs md:text-sm font-medium text-white">Student:</p>
                  <p className="text-xs md:text-sm text-white">{selectedEnrollment.student.username}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <p className="text-xs md:text-sm font-medium text-white">Course:</p>
                  <p className="text-xs md:text-sm text-white">{selectedEnrollment.course.courseName}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <p className="text-xs md:text-sm font-medium text-white">Whatsapp:</p>
                  <p className="text-xs md:text-sm text-white">{selectedEnrollment.whatsapp}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <p className="text-xs md:text-sm font-medium text-white">Amount:</p>
                  <p className="text-xs md:text-sm text-white">Rs.{selectedEnrollment.course.coursePrice}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <p className="text-xs md:text-sm font-medium text-white">Status:</p>
                  <div>{getStatusBadge(selectedEnrollment.enrollmentStatus)}</div>
                </div>
               
                <div className="mt-2 md:mt-4">
                  <p className="text-xs md:text-sm font-medium text-white mb-1 md:mb-2">Change Verification Status:</p>
                  <StatusSelection handleClick={(status: EnrollmentStatus) => handleChangeStatus(status, selectedEnrollment?._id || "")} />
                </div>
              
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setIsPaymentPreviewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
        )}
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="w-[95vw] max-w-md mx-auto h-auto max-h-[80vh] overflow-y-auto">
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
      
      </div>
    )}
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  )
}