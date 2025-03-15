"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Menu,  X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Role } from "@/database/models/user.schema";
import { Input } from "./ui/input";

import GlobalSearch from "./global-search";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log("Session data:", session);
    }
  }, [session, status]);

  useEffect(() => {
    const checkUserRole = async () => {
      if (status === "authenticated" && session?.user?.email && !session.user.role) {
        try {
          const response = await fetch(`/api/user?email=${encodeURIComponent(session.user.email)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.role) {
              session.user.role = data.role;
              
              if (data.role === Role.Admin) {
                router.push("/admin");
              } else if (data.role ===Role.Teacher) {
                router.push("/teacher");
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    checkUserRole();
  }, [session, status, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      const userRole = session.user.role;
      
      if (userRole === Role.Admin) {
        router.push("/admin");
      } else if (userRole === Role.Teacher) {
        router.push("/teacher");
      }
    }
  }, [session, status, router]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    signIn("google");
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "relative" : " ";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  

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
          {session?.user?.role && (
            <div className="text-xs font-medium text-muted-foreground mt-1">
              Role: {session.user.role.charAt(0).toUpperCase() + session.user.role.slice(1)}
            </div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center lg:h-20">
        <div className="flex w-full items-center justify-between lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
          </Button>
          <Link href="/" className="flex items-center">
          <Input
                placeholder="Search..."
                className="pl-7 pr-4 ml-8 py-2 w-3/4 bg-white/10 hover:bg-white/20 focus:bg-white/20 transition-colors border-transparent focus:border-primary"
              />          
          </Link>
          {mounted && session ? (
            <UserMenu />
          ) : (
            mounted && (
              <Button onClick={handleLoginClick} variant="ghost" size="icon" aria-label="Sign in with Google">
                <FcGoogle className="h-6 w-6" />
              </Button>
            )
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl">Learnify</span>
          </Link>
          <div className="flex items-center justify-center flex-1">
          <GlobalSearch />

          <nav className="flex space-x-6 text-sm font-medium ml-20">
            <Link href="/allcourses" className="transition-colors hover:text-primary">
              All Courses
            </Link>
            <Link href="/mycourses" className="transition-colors hover:text-primary">
              My Courses
            </Link>
            
          </nav>
        </div>
         
          <div className="flex items-center space-x-4">
            
            {mounted && session ? (
              <UserMenu />
            ) : (
              mounted && (
                <Button onClick={handleLoginClick} className="hover:opacity-60" size="sm">
                  <FcGoogle className="mr-2 h-4 w-4" /> Sign in with Google
                </Button>
              )
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
  className="fixed inset-0 z-[9999] w-full h-full bg-black/20 lg:hidden"
>

<div className="fixed inset-y-0 left-0 w-64 bg-background shadow-lg">
<div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <span className="font-bold text-xl">Learnify</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
                  <X className="h-10 w-10 " />
                </Button>
              </div>
              
              <nav className="flex flex-col p-4 space-y-4 bg-black/60">
                <Link
                  href="/allcourses"
                  className="transition-colors hover:text-primary"
                  onClick={() => handleLinkClick("/allcourses")}
                >
                  All Courses
                </Link>
                <Link
                  href="/mycourses"
                  className="transition-colors hover:text-primary"
                  onClick={() => handleLinkClick("/mycourses")}
                >
                  My Courses
                </Link>
                
                {mounted && session && (
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
  );
}