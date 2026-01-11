// src/app/(dashboardLayout)/user/dashboard/components/ProfileLayout.tsx
'use client';

import {useState, JSX} from 'react';
import {useRouter} from 'next/navigation';

import ProfileContent from './ProfileContent';
import ErrorState from './ErrorState';
import {UserProfile} from '@/services/profileActions';
import ProfileSidebar from './ProfileSlider';

interface ProfileLayoutProps {
    initialProfile: UserProfile | null;
}

export default function ProfileLayout({initialProfile}: ProfileLayoutProps) {
    const router = useRouter();
    const [profile] = useState(initialProfile);
    const [activeTab, setActiveTab] = useState<
        'overview' | 'events' | 'activity'
    >('overview');

    if (!profile) {
        return <ErrorState onRetry={() => router.refresh()} />;
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            <ProfileSidebar
                profile={profile}
                onEditProfile={() => router.push('/profile/edit')}
                onSettings={() => router.push('/settings')}
            />
            <ProfileContent
                profile={profile}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onBrowseEvents={() => router.push('/events')}
                onCreateEvent={() => router.push('/events/create')}
            />
        </div>
    );
}
