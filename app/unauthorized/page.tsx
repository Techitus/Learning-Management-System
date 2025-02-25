/* eslint-disable react/no-unescaped-entities */
'use client';

import { ShieldX, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <ShieldX className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">
            Sorry, but you don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
           href='/'
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Link>
          
          <Link 
            href="/"
            className="inline-block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Error Code: 403 Forbidden
          </p>
        </div>
      </div>
    </div>
  );
}
