// src/app/(dashboardLayout)/user/dashboard/page.tsx
export const dynamic = 'force-dynamic';

import ProfileHeader from '../../../../components/profileComponents/ProfileHeader';
import ProfileLayout from '../../../../components/profileComponents/ProfileLayout';
import {Suspense} from 'react';
import LoadingState from '../../../../components/profileComponents/LoadingState';
import {getUserProfile} from '@/services/profileActions';

export default async function UserProfilePage() {
    const profileData = await getUserProfile();

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='container mx-auto px-4'>
                <ProfileHeader />
                <Suspense fallback={<LoadingState />}>
                    <ProfileLayout initialProfile={profileData} />
                </Suspense>
            </div>
        </div>
    );
}
