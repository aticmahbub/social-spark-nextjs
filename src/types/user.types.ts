export interface UserInterface {
    id: string;
    email: string;
    role: 'ADMIN' | 'HOST' | 'USER';
    exp: number;
    iat: number;
}
