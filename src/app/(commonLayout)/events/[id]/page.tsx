/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useState, useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {format} from 'date-fns';
import {
    Calendar,
    Clock,
    Users,
    MapPin,
    DollarSign,
    ArrowLeft,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    User,
    Share2,
    CalendarDays,
} from 'lucide-react';

interface Event {
    id: string;
    name: string;
    type: string;
    description: string;
    date: string;
    location: string;
    minParticipants: number;
    maxParticipants: number;
    joiningFee: number;
    status: string;
    image?: string;
    hostId: string;
    host?: {id: string; name: string; email: string; phone?: string};
    _count: {participants: number};
    participants: Array<{
        id: string;
        userId: string;
        status?: string;
        joinedAt?: string;
        user?: {id: string; name: string; email: string; phone?: string};
    }>;
}

export default function EventDetails() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [joining, setJoining] = useState(false);
    const [isParticipant, setIsParticipant] = useState(false);
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [userLoading, setUserLoading] = useState(true);

    // KEY FIX 1: Fetch user first, then event
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (eventId && !userLoading) {
            fetchEventDetails();
        }
    }, [eventId, userLoading]);

    // KEY FIX 2: Check participation after both user and event are loaded
    useEffect(() => {
        if (event && !userLoading) {
            checkParticipation();
        }
    }, [event, currentUser, userLoading]);

    const fetchCurrentUser = async () => {
        try {
            setUserLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                },
            );

            console.log('👤 User fetch status:', response.status);

            if (response.ok) {
                const userData = await response.json();
                console.log('✅ User data:', userData);
                setCurrentUser(userData.data || userData);
            } else {
                console.log('⚠️ User not logged in');
                setCurrentUser(null);
            }
        } catch (error) {
            console.error('❌ Error fetching user:', error);
            setCurrentUser(null);
        } finally {
            setUserLoading(false);
        }
    };

    const fetchEventDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/event/${eventId}`;
            console.log('🎫 Fetching event from:', url);

            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                cache: 'no-store',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error response:', errorText);
                throw new Error(`Failed to fetch event (${response.status})`);
            }

            const result = await response.json();

            // KEY FIX 3: Handle nested response structure
            // Your API returns: {statusCode, success, message, data: {event: {...}}}
            // eslint-disable-next-line prefer-const
            let eventData: any =
                result.data?.event || result.data || result.event || result;

            if (!eventData) {
                throw new Error('No event data in response');
            }

            setEvent(eventData);
        } catch (err: any) {
            console.error('❌ Error fetching event:', err);
            setError(err.message || 'Failed to load event details');
        } finally {
            setLoading(false);
        }
    };

    const checkParticipation = () => {
        if (!event) {
            return;
        }

        // Check if organizer
        const userIsOrganizer = currentUser && currentUser.id === event.hostId;
        setIsOrganizer(userIsOrganizer || false);

        // Check if participant - works with backend that only returns userId
        const userIsParticipant =
            currentUser &&
            event.participants?.some(
                (p) =>
                    p.userId === currentUser.id ||
                    p.user?.id === currentUser.id,
            );
        setIsParticipant(userIsParticipant || false);
    };

    const handleJoinEvent = async () => {
        if (!currentUser) {
            setError('Please sign in to join this event');
            router.push('/login');
            return;
        }

        try {
            setJoining(true);
            setError(null);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/event/join`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({eventId}),
                },
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to join event');
            }

            await fetchEventDetails();
        } catch (err: any) {
            console.error('❌ Error joining:', err);
            setError(err.message || 'Failed to join event');
        } finally {
            setJoining(false);
        }
    };

    const handleLeaveEvent = async () => {
        if (!confirm('Are you sure you want to leave this event?')) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/event/leave`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({eventId}),
                },
            );

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            await fetchEventDetails();
        } catch (err: any) {
            setError(err.message || 'Failed to leave event');
        }
    };

    const handleDeleteEvent = async () => {
        if (!confirm('Delete this event? This cannot be undone.')) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/event/${eventId}`,
                {method: 'DELETE', credentials: 'include'},
            );

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            router.push('/events');
        } catch (err: any) {
            setError(err.message || 'Failed to delete event');
        }
    };

    const handleShareEvent = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: event?.name,
                    text: `Check out: ${event?.name}`,
                    url: window.location.href,
                })
                .catch(console.log);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied!');
        }
    };

    const formatDateTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return {
                date: format(date, 'MMMM dd, yyyy'),
                time: format(date, 'hh:mm a'),
            };
        } catch {
            return {date: 'Invalid date', time: ''};
        }
    };

    const getStatusColor = (status?: string) => {
        const colors: Record<string, string> = {
            OPEN: 'bg-green-100 text-green-800',
            CLOSED: 'bg-red-100 text-red-800',
            CANCELLED: 'bg-gray-100 text-gray-800',
            COMPLETED: 'bg-blue-100 text-blue-800',
        };
        return colors[status || ''] || 'bg-gray-100 text-gray-800';
    };

    const getEventTypeColor = (type?: string) => {
        const colors: Record<string, string> = {
            MEETUP: 'bg-purple-100 text-purple-800',
            WORKSHOP: 'bg-yellow-100 text-yellow-800',
            CONFERENCE: 'bg-indigo-100 text-indigo-800',
            SOCIAL: 'bg-pink-100 text-pink-800',
            SPORTS: 'bg-teal-100 text-teal-800',
            MUSIC: 'bg-orange-100 text-orange-800',
        };
        return colors[type?.toUpperCase() || ''] || 'bg-gray-100 text-gray-800';
    };

    // Loading state
    if (loading || userLoading) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='flex flex-col items-center justify-center h-64'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4'></div>
                    <p className='text-gray-600'>Loading event...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !event) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='bg-red-50 border-l-4 border-red-500 p-4 rounded'>
                    <div className='flex items-start'>
                        <XCircle className='h-5 w-5 text-red-400 mt-0.5' />
                        <div className='ml-3'>
                            <h3 className='font-medium text-red-800'>
                                Error Loading Event
                            </h3>
                            <p className='text-sm text-red-700 mt-1'>{error}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push('/events')}
                        className='mt-4 flex items-center text-blue-600 hover:text-blue-800'
                    >
                        <ArrowLeft className='w-4 h-4 mr-2' />
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }

    // Not found state
    if (!event) {
        return (
            <div className='container mx-auto px-4 py-8 text-center'>
                <CalendarDays className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                <h2 className='text-xl font-semibold mb-2'>Event not found</h2>
                <p className='text-gray-600 mb-6'>
                    This event may have been removed.
                </p>
                <button
                    onClick={() => router.push('/events')}
                    className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                    Browse Events
                </button>
            </div>
        );
    }

    const dateTime = formatDateTime(event.date);
    const isFull = (event._count?.participants || 0) >= event.maxParticipants;
    const canJoin =
        event.status === 'OPEN' &&
        !isFull &&
        !isParticipant &&
        !isOrganizer &&
        currentUser;

    return (
        <div className='container mx-auto px-4 py-8'>
            {/* Error Alert */}
            {error && (
                <div className='mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start justify-between'>
                    <div className='flex items-start'>
                        <XCircle className='h-5 w-5 text-red-400 mt-0.5' />
                        <p className='ml-3 text-sm text-red-700'>{error}</p>
                    </div>
                    <button
                        onClick={() => setError(null)}
                        className='text-red-400 hover:text-red-600'
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Header */}
            <div className='mb-6'>
                <button
                    onClick={() => router.push('/events')}
                    className='flex items-center text-gray-600 hover:text-gray-900 mb-4'
                >
                    <ArrowLeft className='w-5 h-5 mr-2' />
                    Back to Events
                </button>

                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                    <div>
                        <div className='flex items-center gap-3 mb-2 flex-wrap'>
                            <h1 className='text-3xl font-bold'>{event.name}</h1>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                    event.status,
                                )}`}
                            >
                                {event.status}
                            </span>
                        </div>
                        <p className='text-gray-600'>
                            Hosted by {event.host?.name || 'Unknown'}
                        </p>
                    </div>

                    <div className='flex gap-3 flex-wrap'>
                        {isOrganizer && (
                            <>
                                <button
                                    onClick={() =>
                                        router.push(`/events/${eventId}/edit`)
                                    }
                                    className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center gap-2'
                                >
                                    <Edit className='w-4 h-4' />
                                    Edit
                                </button>
                                <button
                                    onClick={handleDeleteEvent}
                                    className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2'
                                >
                                    <Trash2 className='w-4 h-4' />
                                    Delete
                                </button>
                            </>
                        )}
                        <button
                            onClick={handleShareEvent}
                            className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-2'
                        >
                            <Share2 className='w-4 h-4' />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Left: Event Details */}
                <div className='lg:col-span-2 space-y-8'>
                    {/* Image */}
                    <div className='bg-gradient-to-r from-blue-500 to-purple-600 h-64 md:h-80 rounded-xl overflow-hidden'>
                        {event.image ? (
                            <img
                                src={event.image}
                                alt={event.name}
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <div className='w-full h-full flex items-center justify-center'>
                                <Calendar className='w-24 h-24 text-white opacity-50' />
                            </div>
                        )}
                    </div>

                    {/* Type Badge */}
                    <span
                        className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${getEventTypeColor(
                            event.type,
                        )}`}
                    >
                        {event.type?.charAt(0).toUpperCase() +
                            event.type?.slice(1).toLowerCase() || 'Event'}
                    </span>

                    {/* Description */}
                    <div>
                        <h2 className='text-xl font-semibold mb-4'>
                            Description
                        </h2>
                        <p className='text-gray-700 whitespace-pre-line'>
                            {event.description || 'No description provided.'}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className='bg-gray-50 rounded-xl p-6'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Event Details
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-3'>
                                    <Calendar className='w-5 h-5 text-gray-500' />
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Date
                                        </p>
                                        <p className='font-medium'>
                                            {dateTime.date}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Clock className='w-5 h-5 text-gray-500' />
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Time
                                        </p>
                                        <p className='font-medium'>
                                            {dateTime.time}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <MapPin className='w-5 h-5 text-gray-500' />
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Location
                                        </p>
                                        <p className='font-medium'>
                                            {event.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-3'>
                                    <Users className='w-5 h-5 text-gray-500' />
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Participants
                                        </p>
                                        <p className='font-medium'>
                                            {event._count?.participants || 0} /{' '}
                                            {event.maxParticipants}
                                            {isFull && (
                                                <span className='ml-2 text-red-600'>
                                                    (Full)
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <DollarSign className='w-5 h-5 text-gray-500' />
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Fee
                                        </p>
                                        <p className='font-medium'>
                                            {event.joiningFee > 0
                                                ? `$${event.joiningFee.toFixed(
                                                      2,
                                                  )}`
                                                : 'Free'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div>
                        {isOrganizer ? (
                            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                                <p className='text-blue-800 font-medium'>
                                    You are the organizer of this event
                                </p>
                            </div>
                        ) : isParticipant ? (
                            <div className='bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4'>
                                <div className='flex items-center gap-3'>
                                    <CheckCircle className='w-5 h-5 text-green-600' />
                                    <p className='text-green-800 font-medium'>
                                        You are attending this event
                                    </p>
                                </div>
                                <button
                                    onClick={handleLeaveEvent}
                                    className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
                                >
                                    Leave Event
                                </button>
                            </div>
                        ) : canJoin ? (
                            <button
                                onClick={handleJoinEvent}
                                disabled={joining}
                                className='w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-lg disabled:opacity-50 flex items-center justify-center gap-2'
                            >
                                {joining ? (
                                    <>
                                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                                        Joining...
                                    </>
                                ) : (
                                    'Join Event'
                                )}
                            </button>
                        ) : (
                            <div className='bg-gray-100 rounded-lg p-4'>
                                <p className='text-gray-700'>
                                    {!currentUser
                                        ? 'Please sign in to join this event.'
                                        : event.status !== 'OPEN'
                                        ? 'This event is not open for joining.'
                                        : isFull
                                        ? 'This event is full.'
                                        : 'Unable to join this event.'}
                                </p>
                                {!currentUser && (
                                    <button
                                        onClick={() => router.push('/login')}
                                        className='mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                                    >
                                        Sign In
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Organizer & Participants */}
                <div className='space-y-8'>
                    {/* Organizer */}
                    <div className='bg-white rounded-xl shadow-md p-6'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Organizer
                        </h3>
                        <div className='flex items-center gap-4'>
                            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
                                <User className='w-8 h-8 text-blue-600' />
                            </div>
                            <div>
                                <h4 className='font-semibold'>
                                    {event.host?.name || 'Unknown'}
                                </h4>
                                {event.host?.email && (
                                    <p className='text-sm text-gray-600'>
                                        {event.host.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Participants */}
                    <div className='bg-white rounded-xl shadow-md p-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-lg font-semibold'>
                                Participants
                            </h3>
                            <span className='text-sm text-gray-600'>
                                {event._count?.participants || 0} /{' '}
                                {event.maxParticipants}
                            </span>
                        </div>

                        <div className='space-y-4 max-h-96 overflow-y-auto'>
                            {event.participants?.length > 0 ? (
                                event.participants.map((p) => (
                                    <div
                                        key={p.id}
                                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                                    >
                                        <div className='flex items-center gap-3 min-w-0 flex-1'>
                                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                                                <User className='w-5 h-5 text-blue-600' />
                                            </div>
                                            <div className='min-w-0'>
                                                <p className='font-medium truncate'>
                                                    {p.user?.name ||
                                                        `User ${p.userId.slice(
                                                            0,
                                                            8,
                                                        )}...`}
                                                </p>
                                                {p.user?.email && (
                                                    <p className='text-xs text-gray-500 truncate'>
                                                        {p.user.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ml-2 ${
                                                p.status === 'CONFIRMED'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {p.status || 'CONFIRMED'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className='text-center py-8'>
                                    <Users className='w-12 h-12 text-gray-300 mx-auto mb-3' />
                                    <p className='text-gray-600'>
                                        No participants yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
