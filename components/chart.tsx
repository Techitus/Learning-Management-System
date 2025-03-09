"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", students: 186, enrollment: 80 },
  { month: "February", students: 305, enrollment: 200 },
  { month: "March", students: 237, enrollment: 120 },
  { month: "April", students: 73, enrollment: 190 },
  { month: "May", students: 209, enrollment: 130 },
  { month: "June", students: 214, enrollment: 140 },
]

const chartConfig = {
  students: {
    label: "students",
    color: "hsl(var(--chart-1))",
  },
  enrollment: {
    label: "enrollment",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Chart() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true) 
  }, [])

  if (!isClient) {
    return null 
  }

  return (
    <Card className='h-[50vh] md:h-[55vh] 2xl:h-[61vh] w-auto  hidden lg:block'>
      <CardHeader>
        <CardTitle>Data Analysis</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[35vh] md:h-[42vh] 2xl:h-[50vh] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} width={window.innerWidth < 768 ? 300 : 600}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="students" fill="white" radius={4} />
            <Bar dataKey="enrollment" fill="white" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}