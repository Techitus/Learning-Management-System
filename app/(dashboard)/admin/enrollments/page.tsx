import { EnrollmentTable } from "@/components/enrollemt-table";

export default function EnrollmentsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Course Enrollments</h1>
      <p className="text-muted-foreground mb-6">
        Manage student enrollments and verify payment status.
      </p>
      <EnrollmentTable />
    </div>
  );
}