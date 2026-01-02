import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only import Clerk if keys are configured
const hasClerkKeys = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export async function middleware(req: NextRequest) {
  // If Clerk is not configured, allow all requests
  if (!hasClerkKeys) {
    return NextResponse.next();
  }

  // Dynamically import Clerk middleware only when keys exist
  const { clerkMiddleware, createRouteMatcher } = await import(
    "@clerk/nextjs/server"
  );

  const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/admin(.*)",
    "/api/admin(.*)",
    "/insights(.*)",
  ]);

  return clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect();
    }
  })(req, {} as any);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
