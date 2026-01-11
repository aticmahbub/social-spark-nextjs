// src/app/(dashboardLayout)/user/dashboard/components/ProfileSidebar.tsx
'use client';

import {JSX} from 'react';
import {format} from 'date-fns';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Edit,
    LogOut,
    Settings,
    Camera,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Briefcase,
    Shield,
} from 'lucide-react';
import {logoutUser, UserProfile} from '@/services/profileActions';

interface ProfileSidebarProps {
    profile: UserProfile;
    onEditProfile: () => void;
    onSettings: () => void;
}

export default function ProfileSidebar({
    profile,
    onEditProfile,
    onSettings,
}: ProfileSidebarProps) {
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMMM dd, yyyy');
        } catch {
            return 'Unknown date';
        }
    };

    const getRoleBadgeColor = (role: string) => {
        const colors: Record<string, string> = {
            HOST: 'bg-purple-100 text-purple-800',
            ADMIN: 'bg-red-100 text-red-800',
            USER: 'bg-blue-100 text-blue-800',
        };
        return colors[role] || 'bg-blue-100 text-blue-800';
    };

    const getRoleIcon = (role: string) => {
        const icons: Record<string, JSX.Element> = {
            HOST: <Briefcase className='w-4 h-4' />,
            ADMIN: <Shield className='w-4 h-4' />,
            USER: <User className='w-4 h-4' />,
        };
        return icons[role] || <User className='w-4 h-4' />;
    };

    const handleLogout = async () => {
        await logoutUser();
    };

    return (
        <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl shadow-md overflow-hidden sticky top-8'>
                {/* Profile Header */}
                <div className='bg-gradient-to-r from-blue-500 to-purple-600 h-24'></div>

                {/* Profile Info */}
                <div className='px-6 pb-6 -mt-12 relative'>
                    {/* Profile Image */}
                    <div className='relative w-24 h-24 mx-auto mb-4'>
                        <div className='w-full h-full rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden'>
                            {profile.image ? (
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <User className='w-12 h-12 text-gray-400' />
                            )}
                        </div>
                        <button
                            onClick={onEditProfile}
                            className='absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors'
                        >
                            <Camera className='w-4 h-4' />
                        </button>
                    </div>

                    {/* User Name and Role */}
                    <div className='text-center mb-6'>
                        <h2 className='text-xl font-bold text-gray-900'>
                            {profile.name}
                        </h2>
                        <div className='flex items-center justify-center gap-2 mt-2'>
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 ${getRoleBadgeColor(
                                    profile.role,
                                )}`}
                            >
                                {getRoleIcon(profile.role)}
                                {profile.role}
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    {profile.bio && (
                        <div className='mb-6 text-center'>
                            <p className='text-gray-700 text-sm'>
                                {profile.bio}
                            </p>
                        </div>
                    )}

                    {/* User Details */}
                    <div className='space-y-4 mb-6'>
                        <div className='flex items-center gap-3 text-gray-600'>
                            <Mail className='w-4 h-4 flex-shrink-0' />
                            <span className='truncate text-sm'>
                                {profile.email}
                            </span>
                        </div>

                        {profile.location && (
                            <div className='flex items-center gap-3 text-gray-600'>
                                <MapPin className='w-4 h-4 flex-shrink-0' />
                                <span className='text-sm'>
                                    {profile.location}
                                </span>
                            </div>
                        )}

                        <div className='flex items-center gap-3 text-gray-600'>
                            <Calendar className='w-4 h-4 flex-shrink-0' />
                            <span className='text-sm'>
                                Joined {formatDate(profile.createdAt)}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='space-y-3'>
                        <button
                            onClick={onEditProfile}
                            className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
                        >
                            <Edit className='w-4 h-4' />
                            Edit Profile
                        </button>

                        <button
                            onClick={onSettings}
                            className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium'
                        >
                            <Settings className='w-4 h-4' />
                            Settings
                        </button>

                        <button
                            onClick={handleLogout}
                            className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium'
                        >
                            <LogOut className='w-4 h-4' />
                            Log Out
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className='mt-6 pt-6 border-t border-gray-200'>
                        <h4 className='text-sm font-medium text-gray-900 mb-3 text-center'>
                            Connect with me
                        </h4>
                        <div className='flex justify-center gap-3'>
                            <button className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors'>
                                <Twitter className='w-4 h-4' />
                            </button>
                            <button className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors'>
                                <Facebook className='w-4 h-4' />
                            </button>
                            <button className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors'>
                                <Instagram className='w-4 h-4' />
                            </button>
                            <button className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors'>
                                <Linkedin className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
