/* eslint-disable @typescript-eslint/no-explicit-any */
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {NextRequest, NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';
import {URL} from 'url';

type UserRole = 'USER' | 'HOST' | 'ADMIN';
type RouteConfig = {exact: string[]; patterns: RegExp[]};

const authRoutes = ['/login', '/registration', '/forgot-password'];
const commonProtectedRoutes: RouteConfig = {
    exact: ['my-profile', 'settings'],
    patterns: [],
};

const userProtectedRoutes: RouteConfig = {patterns: [/^\/user/], exact: []};
const hostProtectedRoutes: RouteConfig = {patterns: [/^\/host/], exact: []};
const adminProtectedRoutes: RouteConfig = {patterns: [/^\/admin/], exact: []};

const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route) => route === pathname);
};

const isRouteMatched = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === 'ADMIN') {
        return '/admin/dashboard';
    }
    if (role === 'HOST') {
        return '/host/dashboard';
    }
    if (role === 'USER') {
        return '/user/dashboard';
    }
    return '/';
};

export const getRouteOwner = (pathname: string): UserRole | 'COMMON' | null => {
    if (isRouteMatched(pathname, adminProtectedRoutes)) {
        return 'ADMIN';
    }
    if (isRouteMatched(pathname, hostProtectedRoutes)) {
        return 'HOST';
    }
    if (isRouteMatched(pathname, userProtectedRoutes)) {
        return 'USER';
    }
    if (isRouteMatched(pathname, commonProtectedRoutes)) {
        return 'COMMON';
    }
    return null;
};

const roleBasedRoutes = {
    ADMIN: ['/admin/dashboard'],
    HOST: ['/host/dashboard'],
    USER: ['/user/dashboard', '/user/profile'],
};

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();

    const accessToken = request.cookies.get('accessToken')?.value;

    let userRole: UserRole | null = null;

    if (accessToken) {
        const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string,
        );

        if (typeof verifiedToken === 'string') {
            cookieStore.delete('accessToken');
            cookieStore.delete('refreshToken');

            return NextResponse.redirect(new URL('/login', request.url));
        }
        userRole = verifiedToken.role;
    }

    const routerOwner = getRouteOwner(pathname);

    const isAuth = isAuthRoute(pathname);

    if (accessToken && isAuth) {
        return NextResponse.redirect(
            new URL(
                getDefaultDashboardRoute(userRole as UserRole),
                request.url,
            ),
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api).*)'],
};
