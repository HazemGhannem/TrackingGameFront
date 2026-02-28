import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';


const PRIVATE_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
  '/players',
  '/matches',
  '/tournaments',
];
const AUTH_ROUTES = ['/login', '/signup'];

async function isValidToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const loggedIn = token ? await isValidToken(token!) : false;
  const isPrivate = PRIVATE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + '/'),
  );
  const isAuthPage = AUTH_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + '/'),
  );

  if (isAuthPage && loggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isPrivate && !loggedIn) {
    const url = new URL('/login', req.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
