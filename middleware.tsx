// import { NextResponse } from 'next/server';
import { auth } from '@/app/_lib/auth';

// export function middleware(request) {
//   console.log(request);
//   return NextResponse.redirect(new URL('/about', request.url));
// }

const middleware = auth;

export default middleware;

export const config = {
	matcher: ['/account', '/account/reservations', '/account/profile'],
};
