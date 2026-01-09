export type UserRole = 'USER' | 'HOST' | 'ADMIN';

export interface UserInterface {
    id: string;
    email: string;
    role: 'ADMIN' | 'HOST' | 'USER';
    exp: number;
    iat: number;
}

export interface UserInfo {
    name: string;
    email: string;
    role: UserRole;
}
