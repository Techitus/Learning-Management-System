/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useSession, signOut, } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Topbar() {
  const { data: session } = useSession();
  const router = useRouter(); 
  const isAuthenticated = !!session;

  const handleLogout = () => {
    signOut({ callbackUrl: '/' }); 
  };

  return (
    <div className="border-b border-white/10 bg-black/5 backdrop-blur-md">
      <div className="flex h-16 items-center px-4">
        <div className="flex-1" />
        <div className="flex items-center justify-center flex-1">
          <form className="w-full max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, students, or teachers..."
                className="pl-9 pr-4 py-2 w-full bg-white/10 hover:bg-white/20 focus:bg-white/20 transition-colors border-transparent focus:border-primary"
              />
            </div>
          </form>
        </div>
        <div className="flex-1 flex justify-end mr-10">
          {isAuthenticated &&(
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarImage src={session?.user?.image || ''} alt="Profile" />
                    <AvatarFallback>{session?.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) }
        </div>
      </div>
    </div>
  );
}
