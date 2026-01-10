/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import {serverFetch} from '@/lib/server-fetch';
import {zodValidator} from '@/lib/zodValidator';
import {CreateEventPayload, EventStatus} from '@/types/event.types';
import {
    createEventZodSchema,
    updateEventZodSchema,
} from '@/zod/event/event.validation.schema';

export const createEvent = async (_prevState: any, formData: FormData) => {
    try {
        const payload: CreateEventPayload = {
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            description: formData.get('description') as string,
            date: formData.get('date') as string,
            location: formData.get('location') as string,
            minParticipants: Number(formData.get('minParticipants')),
            maxParticipants: Number(formData.get('maxParticipants')),
            joiningFee: Number(formData.get('joiningFee') ?? 0),
            status: formData.get('status') as EventStatus,
            image: null,
        };

        const validated = zodValidator(payload, createEventZodSchema);
        if (!validated.success) return validated;

        const res = await serverFetch.post('/event', {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(validated.data),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || 'Failed to create event',
            };
        }

        return {
            success: true,
            message: 'Event created successfully',
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong',
        };
    }
};

export const hostedEvents = async (queryString?: string) => {
    try {
        const res = await serverFetch.get(
            `/event/my-events${queryString ? `?${queryString}` : ''}`,
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to load events',
        };
    }
};

export const hostedEventsById = async (id: string) => {
    try {
        const res = await serverFetch.get(`/event/${id}`);
        const result = await res.json();

        if (!res.ok) throw new Error(result?.message);

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to load event',
        };
    }
};

export const updateEvent = async (
    id: string,
    _prevState: any,
    formData: FormData,
) => {
    try {
        const payload = new FormData();

        const fields = [
            'name',
            'type',
            'description',
            'date',
            'location',
            'minParticipants',
            'maxParticipants',
            'joiningFee',
            'status',
        ];

        fields.forEach((field) => {
            const value = formData.get(field);
            if (value !== null && value !== undefined) {
                payload.append(field, value.toString());
            }
        });

        const image = formData.get('image') as File;
        if (image && image.size > 0) {
            payload.append('image', image);
        }

        const validationPayload = {
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            description: formData.get('description') as string,
            date: formData.get('date') as string,
            location: formData.get('location') as string,
            minParticipants: Number(formData.get('minParticipants')),
            maxParticipants: Number(formData.get('maxParticipants')),
            joiningFee: Number(formData.get('joiningFee')),
            status: formData.get('status') as EventStatus,
        };

        const validated = zodValidator(validationPayload, updateEventZodSchema);
        if (!validated.success) return validated;

        const res = await serverFetch.patch(`/my-events/${id}`, {
            body: payload,
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || 'Failed to update event',
                errors: result?.errors || [],
            };
        }

        return {
            success: true,
            message: 'Event updated successfully',
            data: result.data,
            errors: [],
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong',
            errors: [],
        };
    }
};

export const deleteEvent = async (id: string) => {
    try {
        const res = await serverFetch.delete(`/event/${id}`);
        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || 'Failed to delete event',
            };
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong',
        };
    }
};
