import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    DollarSign,
    Eye,
    CalendarDays,
} from 'lucide-react';
import {format} from 'date-fns';
import {useRouter} from 'next/navigation';

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
    status: 'OPEN' | 'CLOSED' | 'CANCELLED' | 'COMPLETED';
    image?: string;
    _count: {
        participants: number;
    };
}

interface EventCardProps {
    event: Event;
    showActions?: boolean;
    className?: string;
}

export default function RecentEventCard({
    event,
    showActions = true,
    className = '',
}: EventCardProps) {
    const router = useRouter();

    const formatDateTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return {
                date: format(date, 'MMM dd, yyyy'),
                time: format(date, 'hh:mm a'),
                full: format(date, 'MMM dd, yyyy hh:mm a'),
            };
        } catch {
            return {date: 'Invalid date', time: '', full: 'Invalid date'};
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'CLOSED':
                return 'bg-red-100 text-red-800 hover:bg-red-200';
            case 'CANCELLED':
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    const getEventTypeColor = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'meetup':
                return 'bg-purple-100 text-purple-800';
            case 'workshop':
                return 'bg-yellow-100 text-yellow-800';
            case 'conference':
                return 'bg-indigo-100 text-indigo-800';
            case 'social':
                return 'bg-pink-100 text-pink-800';
            case 'sports':
                return 'bg-teal-100 text-teal-800';
            case 'music':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatEventType = (type: string) => {
        if (!type) return 'Event';
        return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    };

    const dateTime = formatDateTime(event.date);
    const participantCount = event._count?.participants || 0;
    const isFull = participantCount >= event.maxParticipants;
    const spotsLeft = Math.max(0, event.maxParticipants - participantCount);

    const handleViewDetails = () => {
        router.push(`/events/${event.id}`);
    };

    const handleQuickJoin = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Implement quick join logic here
        router.push(`/events/${event.id}?join=true`);
    };

    return (
        <Card
            className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${className}`}
            onClick={handleViewDetails}
        >
            {/* Event Image/Thumbnail */}
            <div className='relative h-48 overflow-hidden'>
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.name}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                ) : (
                    <div className='w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                        <CalendarDays className='w-16 h-16 text-white opacity-50' />
                    </div>
                )}

                {/* Status Badge */}
                <div className='absolute top-3 right-3'>
                    <Badge
                        className={`${getStatusColor(
                            event.status,
                        )} font-semibold`}
                    >
                        {event.status}
                    </Badge>
                </div>

                {/* Type Badge */}
                <div className='absolute top-3 left-3'>
                    <Badge
                        className={`${getEventTypeColor(
                            event.type,
                        )} font-semibold`}
                    >
                        {formatEventType(event.type)}
                    </Badge>
                </div>

                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>

            <CardHeader className='pb-2'>
                <div className='flex items-start justify-between'>
                    <CardTitle className='text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors'>
                        {event.name}
                    </CardTitle>
                </div>

                {/* Short Description */}
                <p className='text-sm text-gray-600 line-clamp-2 mt-2'>
                    {event.description || 'Join this exciting event!'}
                </p>
            </CardHeader>

            <CardContent className='pb-4'>
                <div className='space-y-3'>
                    {/* Date & Time */}
                    <div className='flex items-center gap-2 text-sm'>
                        <div className='flex items-center gap-2 text-gray-700 flex-1'>
                            <Calendar className='h-4 w-4 text-gray-500 flex-shrink-0' />
                            <span className='font-medium'>{dateTime.date}</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-700'>
                            <Clock className='h-4 w-4 text-gray-500 flex-shrink-0' />
                            <span>{dateTime.time}</span>
                        </div>
                    </div>

                    {/* Location */}
                    <div className='flex items-center gap-2 text-sm text-gray-700'>
                        <MapPin className='h-4 w-4 text-gray-500 flex-shrink-0' />
                        <span className='line-clamp-1'>{event.location}</span>
                    </div>

                    {/* Participants & Fee */}
                    <div className='flex items-center justify-between text-sm'>
                        <div className='flex items-center gap-2 text-gray-700'>
                            <Users className='h-4 w-4 text-gray-500' />
                            <span className='font-medium'>
                                {participantCount} / {event.maxParticipants}
                                {isFull && (
                                    <span className='ml-1 text-xs text-red-600 font-medium'>
                                        (Full)
                                    </span>
                                )}
                            </span>
                        </div>

                        {event.joiningFee > 0 ? (
                            <div className='flex items-center gap-2 text-gray-700'>
                                <DollarSign className='h-4 w-4 text-gray-500' />
                                <span className='font-medium'>
                                    ${event.joiningFee.toFixed(2)}
                                </span>
                            </div>
                        ) : (
                            <Badge
                                variant='outline'
                                className='text-green-600 border-green-200 bg-green-50'
                            >
                                Free
                            </Badge>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className='pt-1'>
                        <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                            <div
                                className='h-full bg-blue-500 rounded-full transition-all duration-500'
                                style={{
                                    width: `${Math.min(
                                        (participantCount /
                                            event.maxParticipants) *
                                            100,
                                        100,
                                    )}%`,
                                }}
                            />
                        </div>
                        <div className='flex justify-between text-xs text-gray-500 mt-1'>
                            <span>{participantCount} joined</span>
                            <span>{spotsLeft} spots left</span>
                        </div>
                    </div>
                </div>
            </CardContent>

            {showActions && (
                <CardFooter className='pt-0'>
                    <div className='flex gap-2 w-full'>
                        <Button
                            variant='outline'
                            size='sm'
                            className='flex-1 gap-2'
                            onClick={handleViewDetails}
                        >
                            <Eye className='h-4 w-4' />
                            View Details
                        </Button>

                        {event.status === 'OPEN' && !isFull && (
                            <Button
                                size='sm'
                                className='flex-1 gap-2 bg-green-600 hover:bg-green-700'
                                onClick={handleQuickJoin}
                            >
                                Join Now
                            </Button>
                        )}
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
