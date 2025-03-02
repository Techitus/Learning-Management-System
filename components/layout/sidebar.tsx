'use client';

import { cn } from '@/lib/utils';
import { 
  Home,
  BookOpen,
  Users,
  GraduationCap,
  ChevronLeft,
  Layers,
  Maximize,
  Atom,
  TableOfContents,
  CircleUser,
  Store
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ICON_MAP = {
  'Home': Home,
  'BookOpen': BookOpen,
  'Users': Users,
  'GraduationCap': GraduationCap,
  'Layers': Layers,
  'CircleUser': CircleUser,
  'Atom' : Atom,
  'Store': Store,
  'TableOfContents': TableOfContents,
  
} as const;

type IconName = keyof typeof ICON_MAP;

type SidebarLink = {
  name: string;
  href: string;
  icon: IconName;  
};

interface SidebarProps {
  links: ReadonlyArray<SidebarLink> | SidebarLink[];
    logo?: string;
}

export function Sidebar({ links, logo = "Learnify" }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className="text-white h-screen min-w-[80px] transition-all duration-300"
      style={{ width: expanded ? '300px' : '80px' }}
    >
      <nav className="h-full flex flex-col border-r border-gray-700 text-white">
        <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-700">
          <div className={cn("flex items-center gap-2", !expanded && "hidden")}>
            <BookOpen className="h-8 w-8 text-white" />
            <span className="text-xl 2xl:text-3xl font-bold text-white">{logo}</span>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {expanded ? <ChevronLeft className="text-white" /> : <Maximize className="text-white" />}
          </button>
        </div>
        <TooltipProvider delayDuration={0}>
          <ul className="flex-1 px-3 py-2 text-white">
            {links.map((item) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <li key={item.name}>
                  {!expanded ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-all text-white hover:bg-gray-700 hover:text-white",
                            pathname === item.href && "bg-gray-800 text-white font-semibold",
                            !expanded && "justify-center p-2"
                          )}
                        >
                          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 p-3 text-4xl rounded-lg transition-all text-white hover:bg-gray-700 hover:text-white",
                        pathname === item.href && "bg-gray-800 text-white font-semibold"
                      )}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                      <span className="text-[0.95rem] font-medium text-white">
                        {item.name}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </nav>
    </aside>
  );
}