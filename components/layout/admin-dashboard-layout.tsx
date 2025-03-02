// This can be a server component
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

const adminSidebarLinks = [
  { name: 'Home', href: '/admin', icon: 'Home' },
  { name: 'Categories', href: '/admin/categories', icon: 'Layers' },
  { name: 'Courses', href: '/admin/courses', icon: 'BookOpen' },
  { name: 'Users', href: '/admin/users', icon: 'CircleUser' },
  { name: 'Teachers', href: '/admin/teachers', icon: 'GraduationCap' },
  { name: 'Students', href: '/admin/students', icon: 'Users' },
  { name: 'Enrollment', href: '/admin/enrollments', icon: 'Atom' },
  { name: 'About Us', href: '/admin/about', icon: 'Store' },
] as const;

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar links={adminSidebarLinks} />
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