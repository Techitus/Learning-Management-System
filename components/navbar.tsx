"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLinkClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center lg:h-20">
        
        <div className="flex w-full items-center justify-between lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
          </Button>
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl">Learnify</span>
          </Link>
          <Button variant="ghost" size="icon" aria-label="Sign up with Google">
            <FcGoogle className="h-6 w-6" />
          </Button>
        </div>

        
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl">Learnify</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/solutions" className="transition-colors hover:text-primary">
              All Courses
            </Link>
            <Link href="/industries" className="transition-colors hover:text-primary">
              My Courses
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary">
              About Us
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Contact
            </Button>
            <Button className="hover:opacity-60" size="sm">
              <FcGoogle className="mr-2 h-4 w-4" /> Sign up with Google
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-xl">Learnify</span>
                <Button variant="ghost" size="lg" onClick={toggleMenu} aria-label="Close menu">
                  <X className="h-10 w-10 -ml-10" />
                </Button>
              </div>
              <nav className="flex flex-col p-4 space-y-4">
                <Link
                  href="/solutions"
                  className="transition-colors hover:text-primary"
                  onClick={() => handleLinkClick("/solutions")}
                >
                  All Courses
                </Link>
                <Link
                  href="/industries"
                  className="transition-colors hover:text-primary"
                  onClick={() => handleLinkClick("/industries")}
                >
                  My Courses
                </Link>
                <Link
                  href="/about"
                  className="transition-colors hover:text-primary"
                  onClick={() => handleLinkClick("/about")}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-primary"
                  onClick={() => handleLinkClick("/contact")}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

