import { TeacherDashboardLayout } from '@/components/layout/teacher-dashboard-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <TeacherDashboardLayout>{children}</TeacherDashboardLayout>;
}