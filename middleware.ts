import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname
    const path = request.nextUrl.pathname;

    // Define public paths
    const isPublicPath = path === '/login' || path === '/signup';

    // Check if user has auth token (simplified check - Firebase auth uses different approach)
    // In a real app, you'd verify the Firebase token server-side
    const token = request.cookies.get('__session')?.value || '';

    // Redirect logic
    // if (isPublicPath && token) {
    //     // Logged-in users trying to access auth pages -> redirect to dashboard
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    // if (!isPublicPath && !token && path.startsWith('/dashboard')) {
    //     // Unauthenticated users trying to access protected pages -> redirect to login
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/signup',
    ],
};
