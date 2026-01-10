export enum EventStatus {
    OPEN = 'OPEN',
    FULL = 'FULL',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

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
}

export interface CreateEventPayload {
    name: string;
    type: string;
    description: string;
    date: string | Date;
    location: string;
    minParticipants: number;
    maxParticipants: number;
    image?: string | null;
    joiningFee?: number;
    status?: EventStatus;
}
