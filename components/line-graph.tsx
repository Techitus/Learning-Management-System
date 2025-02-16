"use client"

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
  { month: "January", desktop: 196 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 293 },
  { month: "May", desktop: 229 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <Card className="hidden 2xl:block 2xl:h-[24vh] w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Revenue Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer className="w-full h-full" config={chartConfig}>
          <LineChart
            width={undefined} // Allow it to be responsive
            height={200} // Set equivalent of h-[200px]
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
              dataKey="desktop"
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
