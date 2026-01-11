import {UserProfile} from '@/services/profileActions';

// src/app/(dashboardLayout)/user/dashboard/components/AccountInfo.tsx
interface AccountInfoProps {
    profile: UserProfile;
}

export default function AccountInfo({profile}: AccountInfoProps) {
    return (
        <div className='bg-white rounded-xl shadow-md p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Account Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <h4 className='text-sm font-medium text-gray-700 mb-2'>
                        Basic Information
                    </h4>
                    <dl className='space-y-3'>
                        <div className='flex justify-between'>
                            <dt className='text-sm text-gray-600'>
                                Account ID
                            </dt>
                            <dd className='text-sm font-medium text-gray-900'>
                                {profile.id.substring(0, 8)}...
                            </dd>
                        </div>
                        <div className='flex justify-between'>
                            <dt className='text-sm text-gray-600'>
                                Email Verified
                            </dt>
                            <dd className='text-sm font-medium text-green-600'>
                                Verified
                            </dd>
                        </div>
                        <div className='flex justify-between'>
                            <dt className='text-sm text-gray-600'>
                                Account Status
                            </dt>
                            <dd className='text-sm font-medium text-green-600'>
                                Active
                            </dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <h4 className='text-sm font-medium text-gray-700 mb-2'>
                        Preferences
                    </h4>
                    <dl className='space-y-3'>
                        <div className='flex justify-between'>
                            <dt className='text-sm text-gray-600'>
                                Notifications
                            </dt>
                            <dd className='text-sm font-medium text-gray-900'>
                                Enabled
                            </dd>
                        </div>
                        <div className='flex justify-between'>
                            <dt className='text-sm text-gray-600'>Privacy</dt>
                            <dd className='text-sm font-medium text-gray-900'>
                                Public
                            </dd>
                        </div>
                        <div className='flex justify-between'>
                            <dt className='text-sm text-gray-600'>Language</dt>
                            <dd className='text-sm font-medium text-gray-900'>
                                English
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
