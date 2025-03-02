"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  imageSrc: string;
  name: string;
  position: string;
  className?: string;
}

export function UserProfile({ imageSrc, name, position, className }: UserProfileProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className="h-12 w-12 border-2 border-primary/10">
        <AvatarImage src={imageSrc} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-medium leading-none">{name}</h3>
        <p className="text-sm text-muted-foreground">{position}</p>
      </div>
    </div>
  );
}