import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECURITY_HEADERS: Record<string, string> = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';

    // Placeholder token check. Keep logic centralized so server-side auth hardening
    // can be enabled without touching every route.
    const token = request.cookies.get('__session')?.value || '';
    void isPublicPath
    void token

    const response = NextResponse.next();

    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    // Future enterprise hardening hooks.
    // if (isPublicPath && token) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    // if (!isPublicPath && !token && path.startsWith('/dashboard')) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return response;
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/signup',
    ],
};
