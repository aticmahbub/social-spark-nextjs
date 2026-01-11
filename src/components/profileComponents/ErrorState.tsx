// src/app/(dashboardLayout)/user/dashboard/components/ErrorState.tsx
'use client';

import {User} from 'lucide-react';

interface ErrorStateProps {
    onRetry: () => void;
}

export default function ErrorState({onRetry}: ErrorStateProps) {
    return (
        <div className='bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl mx-auto'>
            <div className='flex items-center'>
                <div className='flex-shrink-0'>
                    <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
                        <User className='w-6 h-6 text-red-600' />
                    </div>
                </div>
                <div className='ml-4'>
                    <h3 className='text-lg font-medium text-red-800'>
                        Error loading profile
                    </h3>
                    <p className='text-red-700 mt-1'>
                        Failed to load profile data
                    </p>
                    <div className='mt-4 flex gap-3'>
                        <button
                            onClick={onRetry}
                            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
                        >
                            Retry
                        </button>
                        <button
                            onClick={() => (window.location.href = '/')}
                            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors'
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
