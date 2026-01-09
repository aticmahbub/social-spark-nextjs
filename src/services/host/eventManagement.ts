/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import {serverFetch} from '@/lib/server-fetch';

export const createEvent = async (payload: any) => {
    console.log(payload);
    // try {
    //     const res = await serverFetch.post('/event', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(payload),
    //     });
    //     const result = await res.json();
    //     if (!res.ok) {
    //         throw new Error(result?.message || 'Failed to create event');
    //     }
    //     return {success: true, data: result.data};
    // } catch (error: any) {
    //     return {
    //         success: false,
    //         message:
    //             process.env.NODE_ENV === 'development'
    //                 ? error.message
    //                 : 'Failed to create event',
    //     };
    // }
};

export const hostedEvents = async (cookie: any) => {
    try {
        console.log(cookie);
        const res = await serverFetch.get('/event/my-events');

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

export const updateEvent = async (id: string, payload: any) => {
    try {
        const res = await serverFetch.put(`/event/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || 'Failed to update event');
        }

        return {success: true, data: result.data};
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to update event',
        };
    }
};

export const deleteEvent = async (id: string) => {
    console.log(id, 'is deleted');
};
