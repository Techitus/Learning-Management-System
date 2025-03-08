/* eslint-disable react/no-unescaped-entities */
// components/GlobalSearch.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
;
import { debounce } from 'lodash';
import { performSearch, setQuery } from '@/store/search/searchSlice';

const GlobalSearch = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query, results, loading, error } = useAppSelector((state) => state.search);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useRef(
    debounce((searchTerm: string) => {
      if (searchTerm.trim().length > 2) {
        dispatch(performSearch(searchTerm));
      }
    }, 300)
  ).current;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    
    if (value.trim().length > 2) {
      debouncedSearch(value);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleItemClick = (type: string, id: string) => {
    setIsOpen(false);
    router.push(`/${type}/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="relative w-full max-w-lg" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={handleSearch}
          placeholder="Search courses, users, and more..."
          className="pl-9 pr-4 py-2 w-full bg-white/10 hover:bg-white/20 focus:bg-white/20 transition-colors border-transparent focus:border-primary"
        />
      </div>

      {isOpen && query.trim().length > 2 && (
        <div className="absolute top-full mt-1 w-full bg-background border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {loading && (
            <div className="p-4 text-center">
              <div className="animate-spin h-5 w-5 border-t-2 border-primary rounded-full mx-auto"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          )}

          {error && (
            <div className="p-4 text-center text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="p-2">
              {results?.courses && results.courses.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold px-2 py-1 bg-gray-100 dark:bg-gray-800">Courses</h3>
                  <ul>
                    {results.courses.map((course) => (
                      <li 
                        key={course._id} 
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center"
                        onClick={() => handleItemClick('course', course._id)}
                      >
                        <div>
                          <p className="font-medium">{course.courseName}</p>
                          {course.courseDescription && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {course.courseDescription}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results?.users && results.users.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold px-2 py-1 bg-gray-100 dark:bg-gray-800">Users</h3>
                  <ul>
                    {results.users.map((user) => (
                      <li 
                        key={user._id} 
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center"
                        onClick={() => handleItemClick('user', user._id)}
                      >
                        <div>
                          <p className="font-medium">{user.username}</p>
                          {user.email && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                          )}
                          {user.role && (
                            <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {user.role}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(!results?.courses || results.courses.length === 0) && 
               (!results?.users || results.users.length === 0) && (
                <div className="p-4 text-center text-gray-500">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;