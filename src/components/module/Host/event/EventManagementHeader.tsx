'use client';

import {Event} from '@/types/event.types';
import {UserInfo} from '@/types/user.types';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import {useRouter} from 'next/navigation';
import {useState, useTransition} from 'react';
import {Plus} from 'lucide-react';

// interface EventManagementHeaderProps {
//     host: UserInfo;
//     events: Event;
// }

export default function EventManagementHeader() {
    //     {
    //     events,
    // }: EventManagementHeaderProps
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };
    return (
        <>
            {/* <EventFormDialogue
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={handleSuccess}
            /> */}

            <ManagementPageHeader
                title='Events Management'
                description='Manage event information and details'
                action={{
                    label: 'Add Event',
                    icon: Plus,
                    onClick: () => setIsDialogOpen(true),
                }}
            />
        </>
    );
}
