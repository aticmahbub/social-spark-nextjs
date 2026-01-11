import {UserRole} from '@/types/user.types';
import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';

type TokenPayload = {
    id: string;
    role: UserRole;
};

export async function getUserFromToken(): Promise<TokenPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) return null;

    try {
        return jwt.decode(token) as TokenPayload;
    } catch {
        return null;
    }
}
