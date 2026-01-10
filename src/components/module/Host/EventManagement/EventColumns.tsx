import {Column} from '@/components/shared/ManagementTable';
import {Event} from '@/types/event.types';
import Image from 'next/image';
import {Pencil} from 'lucide-react';
import {Button} from '@/components/ui/button';

const FALLBACK_IMAGE = '/images/event-placeholder.png';
export const getEventColumns = (
    onEdit: (event: Event) => void,
): Column<Event>[] => [
    {
        header: 'Icon',
        accessor: (event) => (
            <Image
                src={event.image || FALLBACK_IMAGE}
                alt={event.name}
                width={40}
                height={40}
                className='rounded-full'
            />
        ),
    },

    {
        header: 'Title',
        accessor: (event) => (
            <div className='flex flex-col'>
                <span className='font-medium'>{event.name}</span>
                <span className='text-xs text-gray-500'>{event.type}</span>
            </div>
        ),
    },

    {
        header: 'Date',
        accessor: (event) => {
            const iso = event.date;

            const datePart = iso.slice(0, 10); // YYYY-MM-DD
            const timePart = iso.slice(11, 16); // HH:mm

            return (
                <div className='flex flex-col text-sm'>
                    <span>{datePart}</span>
                    <span className='text-xs text-gray-500'>{timePart}</span>
                </div>
            );
        },
    },

    {
        header: 'Location',
        accessor: (event) => event.location,
    },

    {
        header: 'Fee',
        accessor: (event) =>
            event.joiningFee > 0 ? `৳${event.joiningFee}` : 'Free',
    },

    {
        header: 'Status',
        accessor: (event) => (
            <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                    event.status === 'OPEN'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                }`}
            >
                {event.status}
            </span>
        ),
    },

    {
        header: 'Edit',
        accessor: (event) => (
            <Button
                variant='ghost'
                size='sm'
                className='gap-1 text-blue-600'
                onClick={() => onEdit(event)}
            >
                <Pencil size={14} />
                Edit
            </Button>
        ),
    },
];
