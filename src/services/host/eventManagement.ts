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
            image: formData.get('image') as string | null,
        };

        const validated = zodValidator(payload, createEventZodSchema);
        if (!validated.success) {
            return validated;
        }

        const res = await serverFetch.post('/event', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validated.data),
        });

        const result = await res.json();
        console.log(result);

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
        const res = await serverFetch.get(`/event/my-events1
            ${queryString ? `${queryString}` : ''}`);

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || 'Failed to load events');
        }
        return {
            success: true,
            data: result.data,
        };
    } catch (error: any) {
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
        const res = await serverFetch.get(`event/${id}`);

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || 'Failed to load events');
        }
        return {
            success: true,
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to load events',
        };
    }
};

export const updateEvent = async (
    id: string,
    _prevState: any,
    formData: FormData,
) => {
    try {
        const payload = {
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            description: formData.get('description') as string,
            date: new Date(formData.get('date') as string),
            location: formData.get('location') as string,
            minParticipants: Number(formData.get('minParticipants')),
            maxParticipants: Number(formData.get('maxParticipants')),
            joiningFee: Number(formData.get('joiningFee')),
            status: formData.get('status') as 'OPEN' | 'CLOSED',
            image: formData.get('image') as string | null,
        };

        const validatedPayload = zodValidator(
            payload,
            updateEventZodSchema,
        ).data;

        const response = await serverFetch.patch(`/events/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedPayload),
        });

        return await response.json();
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong',
        };
    }
};

export const deleteEvent = async (id: string) => {
    try {
        const response = await serverFetch.delete(`/event/${id}`);

        const result = await response.json();
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
