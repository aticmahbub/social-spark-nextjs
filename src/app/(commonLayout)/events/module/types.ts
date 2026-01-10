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
    organizer?: {
        id: string;
        name: string;
        email: string;
        phone?: string;
    };
    _count: {
        participants: number;
    };
    participants: Array<{
        id: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone?: string;
        };
        status: string;
        joinedAt: string;
    }>;
}

export interface EventResponse {
    success: boolean;
    message: string;
    data: Event;
}
