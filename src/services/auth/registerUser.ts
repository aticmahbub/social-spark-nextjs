/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import z from 'zod';

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
        const registrationData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword'),
            location: formData.get('location'),
        };

        const validatedFields =
            registrationValidationZodSchema.safeParse(registrationData);

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map((issue) => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    };
                }),
            };
        }

        const newFormData = new FormData();
        newFormData.append('data', JSON.stringify(registrationData));

        const res = await fetch(
            `http://localhost:4000/api/v1/user/create-user`,
            {
                method: 'POST',
                body: newFormData,
            },
        ).then((res) => res.json());

        return res;
    } catch (error) {
        console.log(error);
        return {success: false, message: 'Registration failed'};
    }
};
