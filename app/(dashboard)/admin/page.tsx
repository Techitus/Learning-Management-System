import { Chart } from '@/components/chart';
import DateTimeCard from '@/components/date-time';
import { RevenueChart } from '@/components/line-graph';
import Notifications from '@/components/notification-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, GraduationCap, Activity } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6 ">
       <div className='md:flex space-y-6 md:space-y-0 justify-between items-center'>
       <div>
          <h1 className='text-white text-4xl text-center md:text-start'>Dashboard</h1>
        </div>
       <div >
        <DateTimeCard/>
       
       </div>

       </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
       
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Completion</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+12% from last term</p>
          </CardContent>
        </Card>
      </div>
      <div className=" space-y-6 xl:space-y-0 xl:flex w-full gap-10">
  <div className="w-full xl:w-3/5">
    <Chart />
  </div>
  <div className="w-full xl:w-2/5 2xl:space-y-7">
  <RevenueChart/>
    <Notifications />
  </div>
</div>

    </div>
  );
}