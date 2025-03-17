// This can be a server component
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

const studentSidebarLinks = [
  { name: 'Home', href: '/student', icon: 'Home' },
  { name: 'Courses', href: '/student/courses', icon: 'BookOpen' },
  { name: 'My Courses', href: '/student/mycourses', icon: 'TableOfContents' },
  { name: 'Enrollment', href: '/student/enrollments', icon: 'Atom' },
] as const;

export function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar links={studentSidebarLinks} />
      <div className="flex-1 flex flex-col">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background blur-[200px]" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-green-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-green-300/10 blur-[100px]" />
        </div>
        <div className="relative z-10 flex flex-col h-screen">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}