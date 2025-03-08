"use client";

import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";

const chartData = [
  { month: "January", students: 186, courses: 80 },
  { month: "February", students: 305, courses: 200 },
  { month: "March", students: 237, courses: 120 },
  { month: "April", students: 73, courses: 190 },
  { month: "May", students: 209, courses: 130 },
  { month: "June", students: 214, courses: 140 },
];

const chartConfig = {
  students: {
    label: "students",
    color: "hsl(var(--chart-1))",
  },
  courses: {
    label: "courses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function UserChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <Card className="w-full h-[55vh] 2xl:h-[61vh] min-h-[300px] overflow-hidden">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">User & Course Growth</CardTitle>
        <CardDescription className="text-sm">
          {isMobile ? "Last 6 months" : "Showing total users and courses for the last 6 months"}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-5rem)] p-2 sm:p-6">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ 
                left: isMobile ? 0 : 5, 
                right: isMobile ? 5 : 10, 
                top: 10, 
                bottom: isMobile ? 15 : 20  // Reduced bottom margin
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray={isMobile ? "3 3" : "3"} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={4}  // Reduced tick margin
                tickFormatter={(value) => value.slice(0, 3)}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                interval={isMobile ? 1 : 0}
              />
              <YAxis 
                hide={isMobile} 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip 
                cursor={false} 
                content={<ChartTooltipContent indicator="dot" />} 
              />
              <Area
                dataKey="courses"
                type="natural"
                fill="gray"
                fillOpacity={0.4}
                stroke="gray"
                strokeWidth={isMobile ? 1 : 2}
                stackId="a"
              />
              <Area
                dataKey="students"
                type="natural"
                fill="#334155"
                fillOpacity={0.4}
                stroke="#334155"
                strokeWidth={isMobile ? 1 : 2}
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}