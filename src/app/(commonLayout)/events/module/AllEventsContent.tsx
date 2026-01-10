/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useState, useEffect, useCallback} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {format} from 'date-fns';
import {
    Calendar,
    Clock,
    Users,
    MapPin,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    CalendarDays,
    DollarSign,
} from 'lucide-react';
import {Event, EventResponse} from '@/types/eventt.types';

export default function AllEventsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [eventType, setEventType] = useState(searchParams.get('type') || '');
    const [status, setStatus] = useState(searchParams.get('status') || '');
    const [dateFrom, setDateFrom] = useState(searchParams.get('from') || '');
    const [dateTo, setDateTo] = useState(searchParams.get('to') || '');
    const [specificDate, setSpecificDate] = useState(
        searchParams.get('date') || '',
    );

    // Pagination states
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'date');
    const [sortOrder, setSortOrder] = useState(
        searchParams.get('sortOrder') || 'asc',
    );

    // Filter options
    const eventTypes = ['MEETUP', 'WORKSHOP', 'CONFERENCE', 'SOCIAL', 'SPORTS'];
    const statusTypes = ['OPEN', 'CLOSED', 'CANCELLED', 'COMPLETED'];

    // Build query string from filters
    const buildQueryString = useCallback(() => {
        const params = new URLSearchParams();

        // Add filters
        if (search) params.set('search', search);
        if (eventType) params.set('type', eventType);
        if (status) params.set('status', status);
        if (dateFrom) params.set('from', dateFrom);
        if (dateTo) params.set('to', dateTo);
        if (specificDate) params.set('date', specificDate);

        // Add pagination and sorting
        params.set('page', page.toString());
        params.set('limit', limit.toString());
        params.set('sortBy', sortBy);
        params.set('sortOrder', sortOrder);

        return params.toString();
    }, [
        search,
        eventType,
        status,
        dateFrom,
        dateTo,
        specificDate,
        page,
        limit,
        sortBy,
        sortOrder,
    ]);

    // Fetch events
    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const queryString = buildQueryString();
            // Using the serverFetch pattern from your code
            const response = await fetch(
                `https://social-spark-prisma-postgres.onrender.com/api/v1/event?${queryString}`,
                {
                    credentials: 'include', // For cookies
                },
            );

            const result: EventResponse = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to fetch events');
            }

            setEvents(result.data || []);
            setTotal(result.meta?.total || 0);

            // Update URL without refreshing
            router.push(`/events?${queryString}`, {scroll: false});
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    }, [buildQueryString, router]);

    // Initial fetch and when dependencies change
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // Handle filter changes
    const handleFilterChange = () => {
        setPage(1); // Reset to first page when filters change
        fetchEvents();
    };

    // Reset all filters
    const resetFilters = () => {
        setSearch('');
        setEventType('');
        setStatus('');
        setDateFrom('');
        setDateTo('');
        setSpecificDate('');
        setPage(1);
        setSortBy('date');
        setSortOrder('asc');
    };

    // Format date and time
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

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    if (loading) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center items-center h-64'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                    All Events
                </h1>
                <p className='text-gray-600'>
                    Discover and join exciting events around you
                </p>
            </div>

            {/* Filters Section */}
            <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-xl font-semibold text-gray-800 flex items-center gap-2'>
                        <Filter className='w-5 h-5' />
                        Filters
                    </h2>
                    <button
                        onClick={resetFilters}
                        className='px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
                    >
                        Reset Filters
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
                    {/* Search */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Search Events
                        </label>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                            <input
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search by name, location...'
                                className='pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>
                    </div>

                    {/* Event Type */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Event Type
                        </label>
                        <select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        >
                            <option value=''>All Types</option>
                            {eventTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type.charAt(0) +
                                        type.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        >
                            <option value=''>All Status</option>
                            {statusTypes.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Range */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Specific Date
                        </label>
                        <input
                            type='date'
                            value={specificDate}
                            onChange={(e) => setSpecificDate(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>
                </div>

                {/* Date Range Filters */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            From Date
                        </label>
                        <input
                            type='date'
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            To Date
                        </label>
                        <input
                            type='date'
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>
                    <div className='flex items-end'>
                        <button
                            onClick={handleFilterChange}
                            className='w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium'
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* Sorting Controls */}
                <div className='flex flex-wrap gap-4 items-center'>
                    <div className='flex items-center gap-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Sort by:
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className='px-3 py-1 border border-gray-300 rounded-md'
                        >
                            <option value='date'>Date</option>
                            <option value='name'>Name</option>
                            <option value='joiningFee'>Fee</option>
                            <option value='createdAt'>Created At</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Order:
                        </label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className='px-3 py-1 border border-gray-300 rounded-md'
                        >
                            <option value='asc'>Ascending</option>
                            <option value='desc'>Descending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className='bg-red-50 border-l-4 border-red-500 p-4 mb-6'>
                    <div className='flex'>
                        <div className='flex-shrink-0'>
                            <svg
                                className='h-5 w-5 text-red-400'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </div>
                        <div className='ml-3'>
                            <p className='text-sm text-red-700'>{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Events Grid */}
            {events.length === 0 ? (
                <div className='text-center py-12 bg-white rounded-lg shadow'>
                    <CalendarDays className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                        No events found
                    </h3>
                    <p className='text-gray-600'>
                        Try adjusting your filters to find more events.
                    </p>
                </div>
            ) : (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                        {events.map((event) => {
                            const dateTime = formatDateTime(event.date);
                            const isFull =
                                event._count?.participants >=
                                event.maxParticipants;

                            return (
                                <div
                                    key={event.id}
                                    className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
                                >
                                    {/* Event Image */}
                                    <div className='h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative'>
                                        {event.image ? (
                                            <img
                                                src={event.image}
                                                alt={event.name}
                                                className='w-full h-full object-cover'
                                            />
                                        ) : (
                                            <div className='w-full h-full flex items-center justify-center'>
                                                <Calendar className='w-16 h-16 text-white opacity-50' />
                                            </div>
                                        )}
                                        <div className='absolute top-4 right-4'>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    event.status === 'OPEN'
                                                        ? 'bg-green-100 text-green-800'
                                                        : event.status ===
                                                          'CLOSED'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {event.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Event Details */}
                                    <div className='p-6'>
                                        <h3 className='text-xl font-bold text-gray-900 mb-2 truncate'>
                                            {event.name}
                                        </h3>

                                        <div className='space-y-3 mb-4'>
                                            <div className='flex items-center text-gray-600'>
                                                <Calendar className='w-4 h-4 mr-2' />
                                                <span>{dateTime.date}</span>
                                            </div>
                                            <div className='flex items-center text-gray-600'>
                                                <Clock className='w-4 h-4 mr-2' />
                                                <span>{dateTime.time}</span>
                                            </div>
                                            <div className='flex items-center text-gray-600'>
                                                <MapPin className='w-4 h-4 mr-2' />
                                                <span className='truncate'>
                                                    {event.location}
                                                </span>
                                            </div>
                                            <div className='flex items-center text-gray-600'>
                                                <Users className='w-4 h-4 mr-2' />
                                                <span>
                                                    {event._count
                                                        ?.participants ||
                                                        0}{' '}
                                                    / {event.maxParticipants}{' '}
                                                    participants
                                                    {isFull && (
                                                        <span className='ml-2 text-red-600 font-medium'>
                                                            (Full)
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                            {event.joiningFee > 0 && (
                                                <div className='flex items-center text-gray-600'>
                                                    <DollarSign className='w-4 h-4 mr-2' />
                                                    <span>
                                                        $
                                                        {event.joiningFee.toFixed(
                                                            2,
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
                                                {event.type}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/events/${event.id}`,
                                                    )
                                                }
                                                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium'
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow'>
                            <div className='flex flex-1 justify-between sm:hidden'>
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${
                                        page === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${
                                        page === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                            <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
                                <div>
                                    <p className='text-sm text-gray-700'>
                                        Showing{' '}
                                        <span className='font-medium'>
                                            {(page - 1) * limit + 1}
                                        </span>{' '}
                                        to{' '}
                                        <span className='font-medium'>
                                            {Math.min(page * limit, total)}
                                        </span>{' '}
                                        of{' '}
                                        <span className='font-medium'>
                                            {total}
                                        </span>{' '}
                                        results
                                    </p>
                                </div>
                                <div>
                                    <nav
                                        className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                                        aria-label='Pagination'
                                    >
                                        <button
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 1}
                                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                                page === 1
                                                    ? 'cursor-not-allowed'
                                                    : ''
                                            }`}
                                        >
                                            <span className='sr-only'>
                                                Previous
                                            </span>
                                            <ChevronLeft className='h-5 w-5' />
                                        </button>

                                        {Array.from(
                                            {length: Math.min(5, totalPages)},
                                            (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (page <= 3) {
                                                    pageNum = i + 1;
                                                } else if (
                                                    page >=
                                                    totalPages - 2
                                                ) {
                                                    pageNum =
                                                        totalPages - 4 + i;
                                                } else {
                                                    pageNum = page - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() =>
                                                            setPage(pageNum)
                                                        }
                                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                            page === pageNum
                                                                ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            },
                                        )}

                                        <button
                                            onClick={() => setPage(page + 1)}
                                            disabled={page === totalPages}
                                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                                page === totalPages
                                                    ? 'cursor-not-allowed'
                                                    : ''
                                            }`}
                                        >
                                            <span className='sr-only'>
                                                Next
                                            </span>
                                            <ChevronRight className='h-5 w-5' />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
