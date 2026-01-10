/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {format} from 'date-fns';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Edit,
    LogOut,
    Users,
    CalendarDays,
    Settings,
    Shield,
    Briefcase,
    Clock,
    CheckCircle,
    Award,
    Star,
    Activity,
    Bell,
    Bookmark,
    Heart,
    Share2,
    Camera,
    Link,
    Globe,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
} from 'lucide-react';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    image: string | null;
    location: string | null;
    role: 'USER' | 'HOST' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
    joinedEvents?: any[] | boolean;
    hostedEvents?: any[] | boolean;
}

interface ProfileResponse {
    success: boolean;
    message: string;
    data: UserProfile;
}

interface Stats {
    totalJoined: number;
    totalHosted: number;
    upcomingEvents: number;
    completedEvents: number;
}

export default function UserProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<
        'overview' | 'events' | 'activity'
    >('overview');
    const [stats, setStats] = useState<Stats>({
        totalJoined: 0,
        totalHosted: 0,
        upcomingEvents: 0,
        completedEvents: 0,
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (profile) {
            calculateStats();
        }
    }, [profile]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`,
                {
                    credentials: 'include',
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: ProfileResponse = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Failed to fetch profile');
            }

            setProfile(result.data);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            console.error('Error fetching profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = () => {
        // These would come from actual event data
        // For now, using mock data
        setStats({
            totalJoined: 24,
            totalHosted: 8,
            upcomingEvents: 5,
            completedEvents: 27,
        });
    };

    const handleEditProfile = () => {
        router.push('/profile/edit');
    };

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMMM dd, yyyy');
        } catch {
            return 'Unknown date';
        }
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'HOST':
                return 'bg-purple-100 text-purple-800';
            case 'ADMIN':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'HOST':
                return <Briefcase className='w-4 h-4' />;
            case 'ADMIN':
                return <Shield className='w-4 h-4' />;
            default:
                return <User className='w-4 h-4' />;
        }
    };

    if (loading) {
        return (
            <div className='min-h-screen bg-gray-50 py-8'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-center items-center h-64'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className='min-h-screen bg-gray-50 py-8'>
                <div className='container mx-auto px-4'>
                    <div className='bg-red-50 border-l-4 border-red-500 p-6 rounded-lg'>
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
                                <p className='text-red-700'>
                                    {error || 'Profile not found'}
                                </p>
                                <button
                                    onClick={() => router.push('/')}
                                    className='mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
                                >
                                    Go Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='container mx-auto px-4'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        My Profile
                    </h1>
                    <p className='text-gray-600'>
                        Manage your account and view your activity
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                    {/* Left Sidebar - Profile Card */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-xl shadow-md overflow-hidden'>
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
                                    <button className='absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors'>
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
                                        <p className='text-gray-700'>
                                            {profile.bio}
                                        </p>
                                    </div>
                                )}

                                {/* User Details */}
                                <div className='space-y-4 mb-6'>
                                    <div className='flex items-center gap-3 text-gray-600'>
                                        <Mail className='w-4 h-4 flex-shrink-0' />
                                        <span className='truncate'>
                                            {profile.email}
                                        </span>
                                    </div>

                                    {profile.location && (
                                        <div className='flex items-center gap-3 text-gray-600'>
                                            <MapPin className='w-4 h-4 flex-shrink-0' />
                                            <span>{profile.location}</span>
                                        </div>
                                    )}

                                    <div className='flex items-center gap-3 text-gray-600'>
                                        <Calendar className='w-4 h-4 flex-shrink-0' />
                                        <span>
                                            Joined{' '}
                                            {formatDate(profile.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className='space-y-3'>
                                    <button
                                        onClick={handleEditProfile}
                                        className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
                                    >
                                        <Edit className='w-4 h-4' />
                                        Edit Profile
                                    </button>

                                    <button
                                        onClick={() => router.push('/settings')}
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
                                    <h4 className='text-sm font-medium text-gray-900 mb-3'>
                                        Connect with me
                                    </h4>
                                    <div className='flex justify-center gap-3'>
                                        <button className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors'>
                                            <Twitter className='w-4 h-4' />
                                        </button>
                                        <button className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors'>
                                            <Facebook className='w-4 h-4' />
                                        </button>
                                        <button className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors'>
                                            <Instagram className='w-4 h-4' />
                                        </button>
                                        <button className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors'>
                                            <Linkedin className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className='lg:col-span-3'>
                        {/* Stats Cards */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
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
                                        <span>+2 this month</span>
                                    </div>
                                </div>
                            </div>

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

                            <div className='bg-white rounded-xl shadow-md p-6'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Upcoming
                                        </p>
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
                                        <span>Next: Tomorrow</span>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-white rounded-xl shadow-md p-6'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Completed
                                        </p>
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
                                        <span>98% satisfaction</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className='bg-white rounded-xl shadow-md mb-8'>
                            <div className='border-b border-gray-200'>
                                <nav className='flex -mb-px'>
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === 'overview'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('events')}
                                        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === 'events'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        My Events
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('activity')}
                                        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === 'activity'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Activity
                                    </button>
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className='p-6'>
                                {activeTab === 'overview' && (
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                                            Recent Activity
                                        </h3>
                                        <div className='space-y-4'>
                                            {[1, 2, 3].map((item) => (
                                                <div
                                                    key={item}
                                                    className='flex items-start gap-4 p-4 bg-gray-50 rounded-lg'
                                                >
                                                    <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                                        <CheckCircle className='w-5 h-5 text-blue-600' />
                                                    </div>
                                                    <div>
                                                        <p className='text-gray-900'>
                                                            You joined{' '}
                                                            <span className='font-medium'>
                                                                Weekend Hiking
                                                                Adventure
                                                            </span>
                                                        </p>
                                                        <p className='text-sm text-gray-500 mt-1'>
                                                            2 days ago
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className='mt-8'>
                                            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                                                Quick Actions
                                            </h3>
                                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                                <button className='flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                                                    <CalendarDays className='w-6 h-6 text-blue-600 mb-2' />
                                                    <span className='text-sm font-medium'>
                                                        Create Event
                                                    </span>
                                                </button>
                                                <button className='flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                                                    <Bookmark className='w-6 h-6 text-purple-600 mb-2' />
                                                    <span className='text-sm font-medium'>
                                                        Saved Events
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
                                    </div>
                                )}

                                {activeTab === 'events' && (
                                    <div>
                                        <div className='flex justify-between items-center mb-6'>
                                            <h3 className='text-lg font-semibold text-gray-900'>
                                                My Events
                                            </h3>
                                            <div className='flex gap-2'>
                                                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'>
                                                    Hosted Events
                                                </button>
                                                <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium'>
                                                    Joined Events
                                                </button>
                                            </div>
                                        </div>

                                        <div className='space-y-4'>
                                            {[1, 2, 3].map((event) => (
                                                <div
                                                    key={event}
                                                    className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                                                >
                                                    <div className='flex items-center justify-between'>
                                                        <div>
                                                            <h4 className='font-medium text-gray-900'>
                                                                Tech Conference
                                                                2024
                                                            </h4>
                                                            <div className='flex items-center gap-4 mt-2'>
                                                                <span className='flex items-center gap-1 text-sm text-gray-600'>
                                                                    <Calendar className='w-4 h-4' />
                                                                    Jan 25, 2024
                                                                </span>
                                                                <span className='flex items-center gap-1 text-sm text-gray-600'>
                                                                    <MapPin className='w-4 h-4' />
                                                                    San
                                                                    Francisco
                                                                </span>
                                                                <span className='px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full'>
                                                                    Confirmed
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button className='px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'>
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'activity' && (
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                                            Activity Timeline
                                        </h3>
                                        <div className='relative'>
                                            {/* Timeline line */}
                                            <div className='absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200'></div>

                                            <div className='space-y-8'>
                                                {[
                                                    {
                                                        icon: (
                                                            <Users className='w-5 h-5' />
                                                        ),
                                                        color: 'bg-blue-100 text-blue-600',
                                                        title: 'Joined new event',
                                                        time: '2 hours ago',
                                                    },
                                                    {
                                                        icon: (
                                                            <Star className='w-5 h-5' />
                                                        ),
                                                        color: 'bg-yellow-100 text-yellow-600',
                                                        title: 'Received 5-star rating',
                                                        time: '1 day ago',
                                                    },
                                                    {
                                                        icon: (
                                                            <Edit className='w-5 h-5' />
                                                        ),
                                                        color: 'bg-green-100 text-green-600',
                                                        title: 'Updated profile',
                                                        time: '2 days ago',
                                                    },
                                                    {
                                                        icon: (
                                                            <CalendarDays className='w-5 h-5' />
                                                        ),
                                                        color: 'bg-purple-100 text-purple-600',
                                                        title: 'Created new event',
                                                        time: '1 week ago',
                                                    },
                                                ].map((activity, index) => (
                                                    <div
                                                        key={index}
                                                        className='relative pl-16'
                                                    >
                                                        <div
                                                            className={`absolute left-6 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center ${activity.color}`}
                                                        >
                                                            {activity.icon}
                                                        </div>
                                                        <div className='bg-white p-4 rounded-lg border border-gray-200'>
                                                            <p className='font-medium text-gray-900'>
                                                                {activity.title}
                                                            </p>
                                                            <p className='text-sm text-gray-500 mt-1'>
                                                                {activity.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Account Information */}
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
                                            <dt className='text-sm text-gray-600'>
                                                Privacy
                                            </dt>
                                            <dd className='text-sm font-medium text-gray-900'>
                                                Public
                                            </dd>
                                        </div>
                                        <div className='flex justify-between'>
                                            <dt className='text-sm text-gray-600'>
                                                Language
                                            </dt>
                                            <dd className='text-sm font-medium text-gray-900'>
                                                English
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
