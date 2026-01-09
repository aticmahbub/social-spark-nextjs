/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextRequest, NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';
import {URL} from 'url';
import {
    getDefaultDashboardRoute,
    getRouteOwner,
    isAuthRoute,
} from './utils/auth';
import {deleteCookie} from './services/auth/tokenHandlers';
import {UserRole} from './types/user.types';

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const accessToken = request.cookies.get('accessToken')?.value;

    let userRole: UserRole | null = null;

    if (accessToken) {
        const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string,
        );

        if (typeof verifiedToken === 'string') {
            await deleteCookie('accessToken');
            await deleteCookie('refreshToken');

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

    if (routerOwner === null) {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);

        return NextResponse.redirect(loginUrl);
    }

    if (routerOwner === 'COMMON') {
        return NextResponse.next();
    }

    if (
        routerOwner === 'ADMIN' ||
        routerOwner === 'HOST' ||
        routerOwner === 'USER'
    ) {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(
                new URL(
                    getDefaultDashboardRoute(userRole as UserRole),
                    request.url,
                ),
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api).*)'],
};
