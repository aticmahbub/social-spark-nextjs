/* eslint-disable @typescript-eslint/no-explicit-any */
// Filter options
export const eventTypes = [
    'MEETUP',
    'WORKSHOP',
    'CONFERENCE',
    'SOCIAL',
    'SPORTS',
];
export const statusTypes = ['OPEN', 'CLOSED', 'CANCELLED', 'COMPLETED'];
export interface Event {
    id: string;
    name: string;
    type: string;
    description: string;
    date: string;
    location: string;
    minParticipants: number;
    maxParticipants: number;
    joiningFee: number;
    status: string;
    image?: string;
    _count: {
        participants: number;
    };
    participants: any[];
}

export interface EventResponse {
    success: boolean;
    message: string;
    data: Event[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages?: number;
    };
}
