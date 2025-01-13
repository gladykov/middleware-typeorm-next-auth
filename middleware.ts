import "reflect-metadata";
export { auth as middleware } from "@/auth"


/* Code below will work if uncommented, and auth will be commented */


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
//
// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/home', request.url))
// }
//
// export const config = {
//     matcher: '/about/:path*',
// }