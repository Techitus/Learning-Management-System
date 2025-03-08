/* eslint-disable react/no-unescaped-entities */
'use client';

import { ShieldX, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute right-0 top-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] bg-green-500/10 blur-[80px] md:blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] bg-green-300/10 blur-[80px] md:blur-[100px]" />

      <div className="relative max-w-sm w-full bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
            <ShieldX className="w-7 h-7 text-red-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Sorry, but you don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Link>
          
          <Link 
            href="/"
            className="inline-block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Error Code: 403 Forbidden
          </p>
        </div>
      </div>
    </div>
  );
}
