import z from 'zod';

export const createEventSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    date: z.string(), // ISO string
    location: z.string().min(3),
    joiningFee: z.coerce.number().min(0),
    maxParticipants: z.coerce.number().min(1),
});
