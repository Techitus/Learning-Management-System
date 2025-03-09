"use client"

import { useEffect, useState } from "react"
import { CartesianGrid, Line, LineChart } from "recharts"

import {
  Card,
  CardContent,
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
  { month: "January", students: 196 },
  { month: "February", students: 305 },
  { month: "March", students: 237 },
  { month: "April", students: 293 },
  { month: "May", students: 229 },
  { month: "June", students: 214 },
]

const chartConfig = {
  students: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RevenueChart() {
  const [chartWidth, setChartWidth] = useState(0)

  useEffect(() => {
    setChartWidth(window.innerWidth * 0.9) 
  }, [])

  if (chartWidth === 0) return null 

  return (
    <Card className="block h-[20vh] md:h-[16vh] xl:h-[16vh] 2xl:h-[18vh] w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Revenue Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer className="w-full h-full" config={chartConfig}>
          <LineChart
            width={chartWidth} 
            height={200}
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="students"
              type="natural"
              stroke="white"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
