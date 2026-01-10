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
import InputFieldError from '@/components/shared/InputFieldError';
import {updateEvent} from '@/services/host/eventManagement';
import {Event, EventStatus} from '@/types/event.types';
import {mapToInputErrorState} from '@/utils/mapToInputErrorState';

interface EditEventDialogueProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    event: Event;
}

const EditEventDialogue = ({
    open,
    onClose,
    onSuccess,
    event,
}: EditEventDialogueProps) => {
    const [status, setStatus] = useState<EventStatus>(event.status);
    const [type, setType] = useState<string>(event.type);

    const [state, formAction, pending] = useActionState(
        updateEvent.bind(null, event.id),
        null,
    );
    console.log('state:', state);

    const mappedState = mapToInputErrorState(state);

    useEffect(() => {
        if (mappedState.success) {
            toast.success('Event updated successfully');
            onSuccess();
            onClose();
        } else {
            const globalError = mappedState.errors.find(
                (e) => e.field === '_global',
            );
            if (globalError) {
                toast.error(globalError.message);
            }
        }
    }, [mappedState, onSuccess, onClose]);

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className='max-h-[90vh] flex flex-col p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>Edit Event</DialogTitle>
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
                                defaultValue={event.name}
                            />
                            <InputFieldError state={mappedState} field='name' />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='type'>Type</FieldLabel>
                            <Input
                                id='type'
                                name='type'
                                type='hidden'
                                value={type}
                            />
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select event type' />
                                </SelectTrigger>
                                <SelectContent>
                                    {[
                                        'Concert',
                                        'Meetup',
                                        'Workshop',
                                        'Other',
                                    ].map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputFieldError state={mappedState} field='type' />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='description'>
                                Description
                            </FieldLabel>
                            <Input
                                id='description'
                                name='description'
                                defaultValue={event.description}
                            />
                            <InputFieldError
                                state={mappedState}
                                field='description'
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='date'>Date</FieldLabel>
                            <Input
                                id='date'
                                name='date'
                                type='datetime-local'
                                defaultValue={new Date(event.date)
                                    .toISOString()
                                    .slice(0, 16)}
                            />
                            <InputFieldError state={mappedState} field='date' />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='location'>Location</FieldLabel>
                            <Input
                                id='location'
                                name='location'
                                defaultValue={event.location}
                            />
                            <InputFieldError
                                state={mappedState}
                                field='location'
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
                                defaultValue={event.minParticipants}
                                min={1}
                            />
                            <InputFieldError
                                state={mappedState}
                                field='minParticipants'
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='maxParticipants'>
                                Max Participants
                            </FieldLabel>
                            <Input
                                id='maxParticipants'
                                name='maxParticipants'
                                type='number'
                                defaultValue={event.maxParticipants}
                                min={1}
                            />
                            <InputFieldError
                                state={mappedState}
                                field='maxParticipants'
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
                                defaultValue={event.joiningFee}
                                min={0}
                            />
                            <InputFieldError
                                state={mappedState}
                                field='joiningFee'
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
                            <InputFieldError
                                state={mappedState}
                                field='status'
                            />
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
                            <InputFieldError
                                state={mappedState}
                                field='image'
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
                            {pending ? 'Saving...' : 'Update Event'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditEventDialogue;
