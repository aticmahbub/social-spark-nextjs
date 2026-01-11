'use client';

import {useEffect, useState} from 'react';
import {Skeleton} from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import RecentEventCard from './RecentEventCard';

// Updated to match the API response and RecentEventCard expectations
type Event = {
    id: string;
    name: string; // Changed from 'title' to 'name'
    type: string;
    description: string;
    date: string; // Changed from 'startDate' to 'date'
    location: string;
    minParticipants: number;
    maxParticipants: number;
    joiningFee: number;
    status: 'OPEN' | 'CLOSED' | 'CANCELLED' | 'COMPLETED';
    image?: string;
    _count: {
        participants: number;
    };
};

export default function RecentEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecentEvents = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_API_URL}/event?page=1&limit=3&sortBy=createdAt&sortOrder=desc`,
                    {cache: 'no-store'},
                );

                if (!res.ok) throw new Error('Failed to fetch events');

                const data = await res.json();
                setEvents(data.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        getRecentEvents();
    }, []);

    return (
        <section className='container py-16'>
            <div className='mb-8 flex items-center justify-between'>
                <h2 className='text-3xl font-bold'>Recently Added Events</h2>
                <Button asChild variant='outline'>
                    <Link href='/events'>View all</Link>
                </Button>
            </div>

            {loading ? (
                <div className='grid gap-6 md:grid-cols-3'>
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className='h-[400px] rounded-xl' />
                    ))}
                </div>
            ) : events.length === 0 ? (
                <div className='text-center py-12'>
                    <p className='text-gray-500 text-lg'>
                        No events available yet
                    </p>
                </div>
            ) : (
                <div className='grid gap-6 md:grid-cols-3'>
                    {events.map((event: Event) => (
                        <RecentEventCard event={event} key={event.id} />
                    ))}
                </div>
            )}
        </section>
    );
}
