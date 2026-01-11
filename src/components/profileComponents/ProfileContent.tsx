// src/app/(dashboardLayout)/user/dashboard/components/ProfileContent.tsx
'use client';

import {useState, useEffect} from 'react';
import ProfileTabs from './ProfileTabs';
import AccountInfo from './AccountInfo';
import {UserProfile} from '@/services/profileActions';
import StatsCards from './StatsCard';

interface Stats {
    totalJoined: number;
    totalHosted: number;
    upcomingEvents: number;
    completedEvents: number;
}

interface ProfileContentProps {
    profile: UserProfile;
    activeTab: 'overview' | 'events' | 'activity';
    onTabChange: (tab: 'overview' | 'events' | 'activity') => void;
    onBrowseEvents: () => void;
    onCreateEvent: () => void;
}

export default function ProfileContent({
    profile,
    activeTab,
    onTabChange,
    onBrowseEvents,
    onCreateEvent,
}: ProfileContentProps) {
    const [stats, setStats] = useState<Stats>({
        totalJoined: 0,
        totalHosted: 0,
        upcomingEvents: 0,
        completedEvents: 0,
    });

    useEffect(() => {
        // Define the function inside useEffect
        const fetchUserStats = async () => {
            try {
                // Fetch real stats from API
                // For now, using mock data
                setStats({
                    totalJoined: 12,
                    totalHosted: 5,
                    upcomingEvents: 3,
                    completedEvents: 14,
                });
            } catch (err) {
                console.error('Error fetching stats:', err);
                setStats({
                    totalJoined: 12,
                    totalHosted: 5,
                    upcomingEvents: 3,
                    completedEvents: 14,
                });
            }
        };

        fetchUserStats();
    }, [profile]); // Add profile as dependency

    return (
        <div className='lg:col-span-3'>
            <StatsCards profile={profile} stats={stats} />
            <ProfileTabs
                activeTab={activeTab}
                onTabChange={onTabChange}
                onBrowseEvents={onBrowseEvents}
                onCreateEvent={onCreateEvent}
            />
            <AccountInfo profile={profile} />
        </div>
    );
}
