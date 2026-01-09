import {Column} from '@/components/shared/ManagementTable';
import {Event} from '@/types/event.types';
import Image from 'next/image';

const FALLBACK_IMAGE = '/images/event-placeholder.png';

export const EventColumns: Column<Event>[] = [
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
        accessor: (event) => event.name,
    },
];
