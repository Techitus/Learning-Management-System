import { EnrollmentTable } from "@/components/enrollemt-table";

export default function EnrollmentsPage() {
  return (
    <div className="container mx-auto xl:py-10">
      <h1 className="text-3xl font-bold mb-6">Course Enrollments</h1>
      <p className="text-muted-foreground mb-6">
       View your Enrollment Status either is Pending, Approved or Rejected
      </p>
      <EnrollmentTable isAdmin={false}/>
    </div>
  );
}