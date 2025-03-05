import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"

import SessionWrapper from "@/components/SessionWrapper"
import StoreProvider from "./StoreProvider"

const inter = Inter({ subsets: ["latin"] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionWrapper>
    <html lang="en" className="dark overflow-y-auto">
     
      <body className={`${inter.className} custom-scroller bg-background  antialiased`}>
      <StoreProvider>
        {children}
     </StoreProvider>
      </body>
      
    </html>
    </SessionWrapper>
  )
}

