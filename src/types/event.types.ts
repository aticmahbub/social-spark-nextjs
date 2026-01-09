// types/event.types.ts

export type EventStatus = 'OPEN' | 'CLOSED' | 'CANCELLED';

export interface Event {
    id: string;

    name: string;
    type: string;
    description: string;
    date: string; // ISO string from API
    location: string;

    minParticipants: number;
    maxParticipants: number;

    image?: string | null;
    joiningFee: number;

    status: EventStatus;

    hostId: string;

    createdAt: string;
    updatedAt: string;

    // derived / backend-added fields
    participantCount?: number;
}
