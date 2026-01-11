// src/app/(dashboardLayout)/user/dashboard/actions/profile.actions.ts
'use server';

import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    image: string | null;
    location: string | null;
    role: 'USER' | 'HOST' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
    joinedEvents?: boolean;
    hostedEvents?: boolean;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: UserProfile;
}

export async function getUserProfile(): Promise<UserProfile | null> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        if (!accessToken) {
            redirect('/login');
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/profile`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
                },
                cache: 'no-store',
            },
        );

        if (!response.ok) {
            if (response.status === 401) {
                redirect('/login');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        return result.data || result;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}

export async function logoutUser() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        if (accessToken) {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                },
            });
        }

        // Clear cookies
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');

        redirect('/login');
    } catch (error) {
        console.error('Logout failed:', error);
        redirect('/login');
    }
}
