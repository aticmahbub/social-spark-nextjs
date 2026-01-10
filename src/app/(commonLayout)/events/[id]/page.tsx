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
    host?: {
        id: string;
        name: string;
        email: string;
        phone?: string;
    };
    hostId: string; // Add this field
    _count: {
        participants: number;
    };
    participants: Array<{
        id: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone?: string;
        };
        status: string;
        joinedAt: string;
    }>;
}

interface EventResponse {
    success: boolean;
    message: string;
    data: Event;
}

export default function EventDetails() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [joining, setJoining] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [isParticipant, setIsParticipant] = useState(false);
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (eventId) {
            fetchEventDetails();
        }
    }, [eventId]);

    useEffect(() => {
        if (event && currentUser) {
            checkParticipation();
        }
    }, [event, currentUser]);

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`,
                {
                    credentials: 'include',
                },
            );

            if (response.ok) {
                const userData = await response.json();
                setCurrentUser(userData.data);
            }
        } catch (error) {
            console.log('Not logged in or error fetching user');
        }
    };

    const fetchEventDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            // Use the correct endpoint from your routes: GET /api/event/:id
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/event/${eventId}`,
                {
                    credentials: 'include',
                },
            );

            console.log(
                'Fetching event from:',
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/event/${eventId}`,
            );
            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: EventResponse = await response.json();
            console.log('Event response:', result);

            if (!result.success) {
                throw new Error(
                    result.message || 'Failed to fetch event details',
                );
            }

            setEvent(result.data);
        } catch (err: any) {
            console.error('Error fetching event details:', err);
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const checkParticipation = () => {
        if (!event || !currentUser) return;

        // Check if current user is the organizer (host)
        if (currentUser.id === event.hostId) {
            setIsOrganizer(true);
        }

        // Check if current user is a participant
        const isUserParticipant = event.participants?.some(
            (p) => p.user?.id === currentUser.id,
        );
        setIsParticipant(isUserParticipant || false);
    };

    const handleJoinEvent = async () => {
        try {
            setJoining(true);
            setError(null);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/event/join`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({eventId}),
                },
            );

            const result = await response.json();
            console.log('Join response:', result);

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to join event');
            }

            setIsParticipant(true);
            await fetchEventDetails(); // Refresh event details
        } catch (err: any) {
            console.error('Error joining event:', err);
            setError(err.message || 'Failed to join event');
        } finally {
            setJoining(false);
        }
    };

    const handleDeleteEvent = async () => {
        if (
            !confirm(
                'Are you sure you want to delete this event? This action cannot be undone.',
            )
        ) {
            return;
        }

        try {
            // Note: Your delete endpoint is DELETE /api/event/:id
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/event/${eventId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                },
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to delete event');
            }

            router.push('/events');
            router.refresh();
        } catch (err: any) {
            console.error('Error deleting event:', err);
            setError(err.message || 'Failed to delete event');
        }
    };

    const handleShareEvent = () => {
        if (navigator.share) {
            navigator.share({
                title: event?.name || 'Event',
                text: `Check out this event: ${event?.name}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Event link copied to clipboard!');
        }
    };

    const handleEditEvent = () => {
        router.push(`/events/${eventId}/edit`);
    };

    const formatDateTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return {
                date: format(date, 'MMMM dd, yyyy'),
                time: format(date, 'hh:mm a'),
                full: format(date, 'MMMM dd, yyyy hh:mm a'),
            };
        } catch {
            return {date: 'Invalid date', time: '', full: 'Invalid date'};
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'OPEN':
                return 'bg-green-100 text-green-800';
            case 'CLOSED':
                return 'bg-red-100 text-red-800';
            case 'CANCELLED':
                return 'bg-gray-100 text-gray-800';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getEventTypeColor = (type?: string) => {
        switch (type) {
            case 'MEETUP':
                return 'bg-purple-100 text-purple-800';
            case 'WORKSHOP':
                return 'bg-yellow-100 text-yellow-800';
            case 'CONFERENCE':
                return 'bg-indigo-100 text-indigo-800';
            case 'SOCIAL':
                return 'bg-pink-100 text-pink-800';
            case 'SPORTS':
                return 'bg-teal-100 text-teal-800';
            case 'MUSIC':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatEventType = (type?: string) => {
        if (!type) return 'Unknown Type';
        return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    };

    if (loading) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center items-center h-64'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
                </div>
            </div>
        );
    }

    if (error && !event) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='bg-red-50 border-l-4 border-red-500 p-4'>
                    <div className='flex'>
                        <div className='flex-shrink-0'>
                            <XCircle className='h-5 w-5 text-red-400' />
                        </div>
                        <div className='ml-3'>
                            <p className='text-sm text-red-700'>{error}</p>
                            <p className='text-xs text-red-600 mt-1'>
                                Please check if the event exists and try again.
                            </p>
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

    if (!event) {
        return (
            <div className='container mx-auto px-4 py-8 text-center'>
                <CalendarDays className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                    Event not found
                </h2>
                <p className='text-gray-600 mb-6'>
                    The event you are looking for does not exist or has been
                    removed.
                </p>
                <button
                    onClick={() => router.push('/events')}
                    className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium'
                >
                    Browse Events
                </button>
            </div>
        );
    }

    const dateTime = formatDateTime(event.date);
    const isFull = event._count?.participants >= event.maxParticipants;
    const canJoin =
        event.status === 'OPEN' && !isFull && !isParticipant && !isOrganizer;
    const organizerName = event.host?.name || 'Unknown Organizer';

    return (
        <div className='container mx-auto px-4 py-8'>
            {/* Error message display */}
            {error && (
                <div className='mb-6 bg-red-50 border-l-4 border-red-500 p-4'>
                    <div className='flex'>
                        <div className='flex-shrink-0'>
                            <XCircle className='h-5 w-5 text-red-400' />
                        </div>
                        <div className='ml-3'>
                            <p className='text-sm text-red-700'>{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header with back button and actions */}
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
                        <div className='flex items-center gap-3 mb-2'>
                            <h1 className='text-3xl font-bold text-gray-900'>
                                {event.name || 'Untitled Event'}
                            </h1>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                    event.status,
                                )}`}
                            >
                                {event.status || 'UNKNOWN'}
                            </span>
                        </div>
                        <p className='text-gray-600'>
                            Hosted by {organizerName}
                        </p>
                    </div>

                    <div className='flex gap-3'>
                        {isOrganizer && (
                            <>
                                <button
                                    onClick={handleEditEvent}
                                    className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors font-medium flex items-center gap-2'
                                >
                                    <Edit className='w-4 h-4' />
                                    Edit
                                </button>
                                <button
                                    onClick={handleDeleteEvent}
                                    className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium flex items-center gap-2'
                                >
                                    <Trash2 className='w-4 h-4' />
                                    Delete
                                </button>
                            </>
                        )}

                        <button
                            onClick={handleShareEvent}
                            className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium flex items-center gap-2'
                        >
                            <Share2 className='w-4 h-4' />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Left Column - Event Details */}
                <div className='lg:col-span-2'>
                    {/* Event Image */}
                    <div className='bg-gradient-to-r from-blue-500 to-purple-600 h-64 md:h-80 rounded-xl mb-8 overflow-hidden'>
                        {event.image ? (
                            <img
                                src={event.image}
                                alt={event.name || 'Event'}
                                className='w-full h-full object-cover'
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className='w-full h-full flex items-center justify-center'>
                                <Calendar className='w-24 h-24 text-white opacity-50' />
                            </div>
                        )}
                    </div>

                    {/* Event Type */}
                    <div className='mb-6'>
                        <span
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${getEventTypeColor(
                                event.type,
                            )}`}
                        >
                            {formatEventType(event.type)}
                        </span>
                    </div>

                    {/* Event Description */}
                    <div className='mb-8'>
                        <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                            Description
                        </h2>
                        <div className='prose max-w-none'>
                            <p className='text-gray-700 whitespace-pre-line'>
                                {event.description ||
                                    'No description provided.'}
                            </p>
                        </div>
                    </div>

                    {/* Event Details Grid */}
                    <div className='bg-gray-50 rounded-xl p-6 mb-8'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                            Event Details
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-3'>
                                    <Calendar className='w-5 h-5 text-gray-500 flex-shrink-0' />
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
                                    <Clock className='w-5 h-5 text-gray-500 flex-shrink-0' />
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
                                    <MapPin className='w-5 h-5 text-gray-500 flex-shrink-0' />
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Location
                                        </p>
                                        <p className='font-medium'>
                                            {event.location ||
                                                'Location not specified'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <div className='flex items-center gap-3'>
                                    <Users className='w-5 h-5 text-gray-500 flex-shrink-0' />
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Participants
                                        </p>
                                        <p className='font-medium'>
                                            {event._count?.participants || 0} /{' '}
                                            {event.maxParticipants || 0}
                                            {isFull && (
                                                <span className='ml-2 text-red-600 font-medium'>
                                                    (Full)
                                                </span>
                                            )}
                                        </p>
                                        <p className='text-xs text-gray-500'>
                                            Minimum:{' '}
                                            {event.minParticipants || 0}
                                        </p>
                                    </div>
                                </div>

                                {(event.joiningFee || 0) > 0 && (
                                    <div className='flex items-center gap-3'>
                                        <DollarSign className='w-5 h-5 text-gray-500 flex-shrink-0' />
                                        <div>
                                            <p className='text-sm text-gray-600'>
                                                Joining Fee
                                            </p>
                                            <p className='font-medium'>
                                                $
                                                {(
                                                    event.joiningFee || 0
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className='flex items-center gap-3'>
                                    <CalendarDays className='w-5 h-5 text-gray-500 flex-shrink-0' />
                                    <div>
                                        <p className='text-sm text-gray-600'>
                                            Status
                                        </p>
                                        <p
                                            className={`font-medium px-2 py-1 rounded inline-block ${getStatusColor(
                                                event.status,
                                            )}`}
                                        >
                                            {event.status || 'UNKNOWN'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Join/Leave Button */}
                    <div className='mb-8'>
                        {isOrganizer ? (
                            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                                <p className='text-blue-800 font-medium'>
                                    You are the organizer of this event
                                </p>
                            </div>
                        ) : isParticipant ? (
                            <div className='space-y-4'>
                                <div className='bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <CheckCircle className='w-5 h-5 text-green-600' />
                                        <p className='text-green-800 font-medium'>
                                            You are attending this event
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setError(
                                                'Leave functionality not implemented yet',
                                            )
                                        }
                                        className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium'
                                    >
                                        Leave Event
                                    </button>
                                </div>
                            </div>
                        ) : canJoin ? (
                            <button
                                onClick={handleJoinEvent}
                                disabled={joining}
                                className='w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {joining ? 'Joining...' : 'Join Event'}
                            </button>
                        ) : (
                            <div className='bg-gray-100 rounded-lg p-4'>
                                <p className='text-gray-700'>
                                    {event.status !== 'OPEN' &&
                                        'This event is not open for joining.'}
                                    {isFull && 'This event is full.'}
                                    {event.status === 'OPEN' &&
                                        !isFull &&
                                        !isParticipant &&
                                        'Sign in to join this event.'}
                                    {!currentUser &&
                                        'Please sign in to join events.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Organizer & Participants */}
                <div className='space-y-8'>
                    {/* Organizer Info */}
                    <div className='bg-white rounded-xl shadow-md p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                            Organizer
                        </h3>
                        <div className='flex items-center gap-4 mb-4'>
                            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
                                <User className='w-8 h-8 text-blue-600' />
                            </div>
                            <div>
                                <h4 className='font-semibold text-gray-900'>
                                    {organizerName}
                                </h4>
                                {event.host?.email && (
                                    <p className='text-sm text-gray-600'>
                                        {event.host.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Participants List */}
                    <div className='bg-white rounded-xl shadow-md p-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-lg font-semibold text-gray-900'>
                                Participants ({event._count?.participants || 0})
                            </h3>
                            <span className='text-sm text-gray-600'>
                                {event._count?.participants || 0} /{' '}
                                {event.maxParticipants || 0}
                            </span>
                        </div>

                        <div className='space-y-4 max-h-96 overflow-y-auto'>
                            {event.participants &&
                            event.participants.length > 0 ? (
                                event.participants.map((participant) => (
                                    <div
                                        key={participant.id}
                                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                                    >
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                                                <User className='w-5 h-5 text-blue-600' />
                                            </div>
                                            <div>
                                                <p className='font-medium text-gray-900'>
                                                    {participant.user?.name ||
                                                        'Unknown User'}
                                                </p>
                                                <p className='text-xs text-gray-500'>
                                                    {participant.user?.email ||
                                                        ''}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${
                                                participant.status ===
                                                'CONFIRMED'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {participant.status || 'PENDING'}
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
