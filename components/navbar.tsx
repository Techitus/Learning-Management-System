"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { signIn, signOut, useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLinkClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  const handleLoginClick = () => {
    signIn("google")
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
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

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
            <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex-col items-start">
          <div className="text-sm font-medium">{session?.user?.name}</div>
          <div className="text-xs text-muted-foreground">{session?.user?.email}</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

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
          {session ? (
            <UserMenu />
          ) : (
            <Button onClick={handleLoginClick} variant="ghost" size="icon" aria-label="Sign in with Google">
              <FcGoogle className="h-6 w-6" />
            </Button>
          )}
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
            {session ? (
              <UserMenu />
            ) : (
              <Button onClick={handleLoginClick} className="hover:opacity-60" size="sm">
                <FcGoogle className="mr-2 h-4 w-4" /> Sign in with Google
              </Button>
            )}
          </div>
        </div>
      </div>

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
                <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
                  <X className="h-10 w-10 " />
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
                {session && (
                  <Button onClick={handleLogout} variant="ghost" className="justify-start px-0">
                    Log out
                  </Button>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

