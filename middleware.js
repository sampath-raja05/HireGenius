import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import arcjet, { shield, detectBot } from '@arcjet/next';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/explore(.*)',
  '/appointments(.*)',
  '/onboarding(.*)',
]);

const aj = process.env.NODE_ENV === 'production' && process.env.ARCJET_KEY
  ? arcjet({
      key: process.env.ARCJET_KEY,
      rules: [
        shield({
          mode: 'LIVE',
        }),
        detectBot({
          mode: 'LIVE',
          allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
        }),
      ],
    })
  : null;

export default clerkMiddleware(async (auth, req) => {
  if (aj) {
    try {
      const decision = await aj.protect(req);
      if (decision.isDenied()) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch (error) {
      console.error('Arcjet middleware error:', error);
    }
  }

  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
