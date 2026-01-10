'use client';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import EventFormDialogue from './EventFormDialogue';
import {Plus} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useState, useTransition} from 'react';
import {Event} from '@/types/event.types';

interface EventManagementHeaderProps {
    event: Event;
}

export default function EventManagementHeader({
    event,
}: EventManagementHeaderProps) {
    const [, startTransition] = useTransition();

    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <>
            <EventFormDialogue
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                event={event}
            />

            <ManagementPageHeader
                title='Events Management'
                description='Manage Events information and details'
                action={{
                    label: 'Add Event',
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
}
