'use client';

import InputFieldError from '@/components/shared/InputFieldError';
import {Button} from '@/components/ui/button';
import {Field, FieldLabel} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {createEvent} from '@/services/host/eventManagement';
import React, {useActionState} from 'react';

interface CreateEventFormProps {
    onCancel?: () => void;
    onSuccess?: () => void;
}

export default function CreateEventForm({onCancel}: CreateEventFormProps) {
    const [state, formAction, pending] = useActionState(createEvent, null);

    return (
        <form action={formAction} className='space-y-6'>
            {/* ========= PART 1: BASIC INFO ========= */}

            <div className='space-y-4'>
                <Field>
                    <FieldLabel htmlFor='name'>Event Name</FieldLabel>
                    <Input
                        id='name'
                        name='name'
                        placeholder='Marathon'
                        required
                    />
                    <InputFieldError field='name' state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor='type'>Type</FieldLabel>
                    <Select name='type'>
                        <SelectTrigger>
                            <SelectValue placeholder='Select type' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='sports'>Sports</SelectItem>
                            <SelectItem value='music'>Music</SelectItem>
                            <SelectItem value='art'>Art</SelectItem>
                            <SelectItem value='tech'>Tech</SelectItem>
                            <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputFieldError field='type' state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor='description'>Description</FieldLabel>
                    <Textarea
                        id='description'
                        name='description'
                        placeholder='Describe your event...'
                        required
                    />
                    <InputFieldError field='description' state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor='date'>Date & Time</FieldLabel>
                    <Input
                        id='date'
                        name='date'
                        type='datetime-local'
                        required
                    />
                    <InputFieldError field='date' state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor='location'>Location</FieldLabel>
                    <Input
                        id='location'
                        name='location'
                        placeholder='London'
                        required
                    />
                    <InputFieldError field='location' state={state} />
                </Field>
            </div>

            {/* ========= PART 2: SETTINGS & MEDIA ========= */}

            <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <Field>
                        <FieldLabel htmlFor='minParticipants'>
                            Min Participants
                        </FieldLabel>
                        <Input
                            id='minParticipants'
                            name='minParticipants'
                            type='number'
                            required
                        />
                        <InputFieldError
                            field='minParticipants'
                            state={state}
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
                            required
                        />
                        <InputFieldError
                            field='maxParticipants'
                            state={state}
                        />
                    </Field>
                </div>

                <Field>
                    <FieldLabel htmlFor='joiningFee'>Joining Fee</FieldLabel>
                    <Input
                        id='joiningFee'
                        name='joiningFee'
                        type='number'
                        step='0.01'
                        required
                    />
                    <InputFieldError field='joiningFee' state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor='status'>Status</FieldLabel>
                    <Select name='status' defaultValue='OPEN'>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='OPEN'>Open</SelectItem>
                            <SelectItem value='CLOSED'>Closed</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputFieldError field='status' state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor='image'>Event Image URL</FieldLabel>
                    <Input
                        id='image'
                        name='image'
                        type='url'
                        placeholder='https://images.unsplash.com/...'
                    />
                    <InputFieldError field='image' state={state} />
                </Field>
            </div>

            {/* ACTIONS */}
            <div className='flex justify-end gap-2 pt-4'>
                {onCancel && (
                    <Button
                        type='button'
                        variant='outline'
                        onClick={onCancel}
                        disabled={pending}
                    >
                        Cancel
                    </Button>
                )}
                <Button type='submit' disabled={pending}>
                    {pending ? 'Saving...' : 'Save Event'}
                </Button>
            </div>
        </form>
    );
}
