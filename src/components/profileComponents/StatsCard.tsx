// src/app/(dashboardLayout)/user/dashboard/components/StatsCards.tsx
'use client';

import {UserProfile} from '@/services/profileActions';
import {
    Users,
    Briefcase,
    CalendarDays,
    Clock,
    CheckCircle,
    Activity,
    Star,
    Award,
} from 'lucide-react';

interface StatsCardsProps {
    profile: UserProfile;
    stats: {
        totalJoined: number;
        totalHosted: number;
        upcomingEvents: number;
        completedEvents: number;
    };
}

export default function StatsCards({profile, stats}: StatsCardsProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {(profile.role === 'USER' || profile.role === 'ADMIN') && (
                <div className='bg-white rounded-xl shadow-md p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm text-gray-600'>
                                Joined Events
                            </p>
                            <p className='text-2xl font-bold text-gray-900'>
                                {stats.totalJoined}
                            </p>
                        </div>
                        <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                            <Users className='w-6 h-6 text-blue-600' />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex items-center text-sm text-green-600'>
                            <Activity className='w-4 h-4 mr-1' />
                            <span>Active participant</span>
                        </div>
                    </div>
                </div>
            )}

            {(profile.role === 'HOST' || profile.role === 'ADMIN') && (
                <div className='bg-white rounded-xl shadow-md p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm text-gray-600'>
                                Hosted Events
                            </p>
                            <p className='text-2xl font-bold text-gray-900'>
                                {stats.totalHosted}
                            </p>
                        </div>
                        <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'>
                            <Briefcase className='w-6 h-6 text-purple-600' />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex items-center text-sm text-green-600'>
                            <Star className='w-4 h-4 mr-1' />
                            <span>Active host</span>
                        </div>
                    </div>
                </div>
            )}

            <div className='bg-white rounded-xl shadow-md p-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-sm text-gray-600'>Upcoming</p>
                        <p className='text-2xl font-bold text-gray-900'>
                            {stats.upcomingEvents}
                        </p>
                    </div>
                    <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                        <CalendarDays className='w-6 h-6 text-green-600' />
                    </div>
                </div>
                <div className='mt-4'>
                    <div className='flex items-center text-sm text-blue-600'>
                        <Clock className='w-4 h-4 mr-1' />
                        <span>Next events soon</span>
                    </div>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-md p-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-sm text-gray-600'>Completed</p>
                        <p className='text-2xl font-bold text-gray-900'>
                            {stats.completedEvents}
                        </p>
                    </div>
                    <div className='w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center'>
                        <CheckCircle className='w-6 h-6 text-yellow-600' />
                    </div>
                </div>
                <div className='mt-4'>
                    <div className='flex items-center text-sm text-purple-600'>
                        <Award className='w-4 h-4 mr-1' />
                        <span>Great track record</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
