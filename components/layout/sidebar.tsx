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
  Store,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 1024;
      setIsMobile(mobileView);
      setExpanded(!mobileView); 
      if (!mobileView) {
        setMobileOpen(false);
      }
    };
    
    handleResize(); 
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-700 hover:bg-gray-800 transition-colors"
        >
          {mobileOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      )}

      <aside
        className={cn(
          "text-white h-screen transition-all duration-300 z-40",
          isMobile ? "fixed top-0 left-0" : "min-w-[80px]",
          isMobile && !mobileOpen && "-translate-x-full"
        )}
        style={{ width: isMobile ? '80px' : expanded ? '300px' : '80px' }}
      >
        <nav className="h-full flex flex-col border-r border-gray-800 text-white ">
          <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-800">
            {!isMobile && expanded && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-white" />
                <span className="text-xl 2xl:text-3xl font-bold text-white">{logo}</span>
              </div>
            )}
            {isMobile && (
              <div className="flex justify-center w-full">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            )}
            {!isMobile && ( 
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                {expanded ? <ChevronLeft className="text-white" /> : <Maximize className="text-white" />}
              </button>
            )}
          </div>
          <TooltipProvider delayDuration={0}>
            <ul className="flex-1 px-3 py-2 text-white">
              {links.map((item) => {
                const Icon = ICON_MAP[item.icon];
                return (
                  <li key={item.name}>
                    {isMobile ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "flex items-center justify-center p-3 rounded-lg transition-all text-white hover:bg-gray-700 hover:text-white my-2",
                              pathname === item.href && "bg-black/90 text-white"
                            )}
                          >
                            <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-gray-800 text-white border-gray-800">
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    ) : !expanded ? (
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
                        <TooltipContent side="right" className="bg-gray-800 text-white border-gray-800">
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      // Desktop expanded view - icons with text
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-all text-white hover:bg-gray-700 hover:text-white",
                          pathname === item.href && "bg-gray-800 text-white font-semibold"
                        )}
                      >
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                        <span className="text-[0.95rem] font-medium text-white">{item.name}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </TooltipProvider>
        </nav>
      </aside>

      {/* Overlay for mobile view */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}