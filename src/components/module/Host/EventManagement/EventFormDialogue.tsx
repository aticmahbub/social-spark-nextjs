'use client';

import React, {useState, useEffect, useActionState} from 'react';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Field, FieldLabel} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {Event, EventStatus} from '@/types/event.types';
import {createEvent, updateEvent} from '@/services/host/eventManagement';

interface IEventFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    event?: Event;
}

const EventFormDialogue = ({
    open,
    onClose,
    onSuccess,
    event,
}: IEventFormDialogProps) => {
    const isEdit = !!event;

    const [status, setStatus] = useState<EventStatus>(
        event?.status || EventStatus.OPEN,
    );

    const [state, formAction, pending] = useActionState(
        isEdit ? updateEvent.bind(null, event!.id) : createEvent,
        null,
    );

    useEffect(() => {
        if (state?.success) {
            toast.success(getStateMessage(state) ?? 'Success');
            onSuccess();
            onClose();
        } else if (state && !state.success) {
            toast.error(getStateMessage(state) ?? 'Something went wrong');
        }
    }, [state, onSuccess, onClose]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='max-h-[90vh] flex flex-col p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>
                        {isEdit ? 'Edit Event' : 'Create Event'}
                    </DialogTitle>
                </DialogHeader>

                <form
                    action={formAction}
                    className='flex flex-col flex-1 min-h-0'
                >
                    <div className='flex-1 overflow-y-auto px-6 space-y-4 pb-4'>
                        <Field>
                            <FieldLabel htmlFor='name'>Name</FieldLabel>
                            <Input
                                id='name'
                                name='name'
                                placeholder='Event Name'
                                defaultValue={event?.name}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='type'>Type</FieldLabel>
                            <Input
                                id='type'
                                name='type'
                                placeholder='Event type'
                                defaultValue={event?.type}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='description'>
                                Description
                            </FieldLabel>
                            <Input
                                id='description'
                                name='description'
                                placeholder='Event description'
                                defaultValue={event?.description}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='date'>Date</FieldLabel>
                            <Input
                                id='date'
                                name='date'
                                type='datetime-local'
                                defaultValue={
                                    event?.date
                                        ? new Date(event.date)
                                              .toISOString()
                                              .slice(0, 16)
                                        : ''
                                }
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='location'>Location</FieldLabel>
                            <Input
                                id='location'
                                name='location'
                                placeholder='Event Location'
                                defaultValue={event?.location}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='minParticipants'>
                                Min Participants
                            </FieldLabel>
                            <Input
                                id='minParticipants'
                                name='minParticipants'
                                type='number'
                                placeholder='1'
                                defaultValue={event?.minParticipants}
                                min={1}
                            />
                            \
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='maxParticipants'>
                                Max Participants
                            </FieldLabel>
                            <Input
                                id='maxParticipants'
                                name='maxParticipants'
                                type='number'
                                placeholder='100'
                                defaultValue={event?.maxParticipants}
                                min={1}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='joiningFee'>
                                Joining Fee
                            </FieldLabel>
                            <Input
                                id='joiningFee'
                                name='joiningFee'
                                type='number'
                                placeholder='0'
                                defaultValue={event?.joiningFee}
                                min={0}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='status'>Status</FieldLabel>

                            <Input
                                id='status'
                                name='status'
                                type='hidden'
                                value={status}
                            />

                            <Select
                                value={status}
                                onValueChange={(v) =>
                                    setStatus(v as EventStatus)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Select status' />
                                </SelectTrigger>

                                <SelectContent>
                                    {Object.values(EventStatus).map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='image'>
                                Event Banner
                            </FieldLabel>
                            <Input
                                id='image'
                                name='image'
                                type='file'
                                accept='image/*'
                            />
                        </Field>
                    </div>

                    <div className='flex justify-end gap-2 px-6 py-4 border-t bg-gray-50'>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={onClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' disabled={pending}>
                            {pending
                                ? 'Saving...'
                                : isEdit
                                ? 'Update Event'
                                : 'Create Event'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EventFormDialogue;
