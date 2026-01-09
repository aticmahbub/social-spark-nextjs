/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import z from 'zod';
import {loginUser} from './loginUser';
import {zodValidator} from '@/lib/zodValidator';
import {serverFetch} from '@/lib/server-fetch';

const registrationValidationZodSchema = z
    .object({
        name: z.string().min(1, {message: 'Name is required'}),
        location: z.string().optional(),
        email: z.email({message: 'Valid email is required'}),
        password: z
            .string()
            .min(6, {
                error: 'Password is required and must be at least 6 characters long',
            })
            .max(100, {
                error: 'Password must be at most 100 characters long',
            }),
        confirmPassword: z.string().min(6, {
            error: 'Confirm Password is required and must be at least 6 characters long',
        }),
    })
    .refine((data: any) => data.password === data.confirmPassword, {
        error: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const registerUser = async (
    _currentState: any,
    formData: FormData,
): Promise<any> => {
    try {
        const payload = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword'),
            location: formData.get('location'),
        };

        if (
            zodValidator(payload, registrationValidationZodSchema).success ===
            false
        ) {
            return zodValidator(payload, registrationValidationZodSchema);
        }

        const validatedPayload = zodValidator(
            payload,
            registrationValidationZodSchema,
        ).data;

        const newFormData = new FormData();
        newFormData.append('data', JSON.stringify(validatedPayload));

        if (formData.get('file')) {
            newFormData.append('file', formData.get('file') as Blob);
        }

        const res = await serverFetch.post(`/user/create-user`, {
            body: newFormData,
        });
        const result = await res.json();

        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? error?.message
                    : 'Registration failed'
            }`,
        };
    }
};
