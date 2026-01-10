'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialogue';
import ManagementTable from '@/components/shared/ManagementTable';
import {Event} from '@/types/event.types';
import {useState, useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {deleteEvent} from '@/services/host/eventManagement';
import {getEventColumns} from './EventColumns';
import {toast} from 'sonner';
import EventFormDialogue from './EventFormDialogue';

interface EventTableProps {
    events: Event[];
}

export default function EventTable({events}: EventTableProps) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isDeletingDialog, setIsDeletingDialog] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (event: Event) => {
        setDeletingEvent(event);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
    };

    const confirmDelete = async () => {
        if (!deletingEvent) return;

        setIsDeletingDialog(true);
        const result = await deleteEvent(deletingEvent.id);
        setIsDeletingDialog(false);

        if (result.success) {
            toast.success(result.message || 'Event deleted successfully');
            setDeletingEvent(null);
            handleRefresh();
        } else {
            toast.error(result.message || 'Failed to delete event');
        }
    };

    return (
        <>
            <ManagementTable
                data={events}
                columns={getEventColumns(handleEdit)}
                onDelete={handleDelete}
                getRowKey={(event) => event.id}
                emptyMessage='No events found'
            />

            {/* EDIT DIALOG */}
            <EventFormDialogue
                open={!!editingEvent}
                event={editingEvent ?? undefined}
                onClose={() => setEditingEvent(null)}
                onSuccess={handleRefresh}
            />

            {/* DELETE DIALOG */}
            <DeleteConfirmationDialog
                open={!!deletingEvent}
                onOpenChange={(open) => !open && setDeletingEvent(null)}
                onConfirm={confirmDelete}
                title='Delete Event'
                description={
                    deletingEvent
                        ? `Are you sure you want to delete "${deletingEvent.name}"?`
                        : undefined
                }
                isDeleting={isDeletingDialog}
            />
        </>
    );
}
