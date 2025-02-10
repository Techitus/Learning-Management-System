import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import SessionWrapper from "@/components/SessionWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Learnify-Unlock New Horizons of Learning"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark ">
     
      <body className={`${inter.className} custom-scroller bg-background text-foreground antialiased`}>
      <SessionWrapper>
        <MouseMoveEffect />
        {children}
        </SessionWrapper>
      </body>
      
    </html>
  )
}

