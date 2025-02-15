"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function DateTimeCard() {
  const [dateTime, setDateTime] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
      setDateTime(now.toLocaleString("en-US", options))
    }

    updateDateTime()
    const timer = setInterval(updateDateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-3">
        <p className="text-white text-sm font-medium">{dateTime}</p>
      </CardContent>
    </Card>
  )
}

