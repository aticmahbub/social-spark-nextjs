/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(dashboardLayout)/user/dashboard/components/ProfileTabs.tsx
'use client';

import {CalendarDays, Bookmark, Bell, Heart} from 'lucide-react';

interface ProfileTabsProps {
    activeTab: 'overview' | 'events' | 'activity';
    onTabChange: (tab: 'overview' | 'events' | 'activity') => void;
    onBrowseEvents: () => void;
    onCreateEvent: () => void;
}

export default function ProfileTabs({
    activeTab,
    onTabChange,
    onBrowseEvents,
    onCreateEvent,
}: ProfileTabsProps) {
    return (
        <div className='bg-white rounded-xl shadow-md mb-8'>
            <div className='border-b border-gray-200'>
                <nav className='flex -mb-px'>
                    {['overview', 'events', 'activity'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab as any)}
                            className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors capitalize ${
                                activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className='p-6'>
                {activeTab === 'overview' && (
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                            Quick Actions
                        </h3>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            <button
                                onClick={onCreateEvent}
                                className='flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                            >
                                <CalendarDays className='w-6 h-6 text-blue-600 mb-2' />
                                <span className='text-sm font-medium'>
                                    Create Event
                                </span>
                            </button>
                            <button
                                onClick={onBrowseEvents}
                                className='flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                            >
                                <Bookmark className='w-6 h-6 text-purple-600 mb-2' />
                                <span className='text-sm font-medium'>
                                    Browse Events
                                </span>
                            </button>
                            <button className='flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                                <Bell className='w-6 h-6 text-yellow-600 mb-2' />
                                <span className='text-sm font-medium'>
                                    Notifications
                                </span>
                            </button>
                            <button className='flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                                <Heart className='w-6 h-6 text-red-600 mb-2' />
                                <span className='text-sm font-medium'>
                                    Interests
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className='text-center py-12'>
                        <CalendarDays className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                        <h3 className='text-lg font-medium text-gray-900 mb-2'>
                            No events yet
                        </h3>
                        <p className='text-gray-600 mb-6'>
                            Start by creating or joining an event
                        </p>
                        <button
                            onClick={onBrowseEvents}
                            className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                        >
                            Browse Events
                        </button>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className='text-center py-12'>
                        <CalendarDays className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                        <h3 className='text-lg font-medium text-gray-900 mb-2'>
                            No recent activity
                        </h3>
                        <p className='text-gray-600'>
                            Your activity will appear here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
