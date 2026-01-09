import {z} from 'zod';

export const createEventZodSchema = z.object({
    name: z.string().min(1, 'Event name is required'),

    type: z.string().min(1, 'Event type is required'),
    // type: z.enum(['sports', 'tech', 'music', 'art']),

    description: z
        .string()
        .min(10, 'Description must be at least 10 characters'),

    date: z.coerce.date('Invalid date format'),

    location: z.string().min(1, 'Location is required'),

    minParticipants: z
        .number()
        .int()
        .min(1, 'Minimum participants must be at least 1'),

    maxParticipants: z
        .number()
        .int()
        .min(1, 'Maximum participants must be at least 1'),

    image: z.string().url().optional(),

    joiningFee: z.number().min(0, 'Joining fee cannot be negative').default(0),

    status: z.enum(['OPEN', 'CLOSED', 'CANCELLED']).optional(),
});

export const updateEventZodSchema = z
    .object({
        name: z
            .string()
            .min(3, 'Event name must be at least 3 characters')
            .optional(),

        type: z.string().min(2, 'Event type is required').optional(),

        description: z
            .string()
            .min(10, 'Description must be at least 10 characters')
            .optional(),

        date: z
            .date({
                error: 'Event date is required',
            })
            .optional(),

        location: z
            .string()
            .min(3, 'Location must be at least 3 characters')
            .optional(),

        minParticipants: z
            .number()
            .int()
            .min(1, 'Minimum participants must be at least 1')
            .optional(),

        maxParticipants: z
            .number()
            .int()
            .min(1, 'Maximum participants must be at least 1')
            .optional(),

        joiningFee: z
            .number()
            .min(0, 'Joining fee cannot be negative')
            .optional(),

        status: z.enum(['OPEN', 'CLOSED']).optional(),

        image: z
            .string()
            .url('Image must be a valid URL')
            .optional()
            .nullable(),
    })
    .refine(
        (data) =>
            data.minParticipants === undefined ||
            data.maxParticipants === undefined ||
            data.minParticipants <= data.maxParticipants,
        {
            message: 'minParticipants cannot be greater than maxParticipants',
            path: ['minParticipants'],
        },
    );

export type CreateEventInput = z.infer<typeof createEventZodSchema>;
