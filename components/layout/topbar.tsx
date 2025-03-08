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
import GlobalSearch from '../global-search';

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
          <GlobalSearch/>
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
          ) }
        </div>
      </div>
    </div>
  );
}
