// middleware.js (root of your project, NOT in src/ or app/)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define your protected routes here
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",  // Protects /dashboard, /dashboard/settings, etc.
  // Add more: "/admin(.*)", "/profile(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect if the route matches
  if (isProtectedRoute(req)) {
    await auth.protect();  // Auto-redirects unauth users to /sign-in
  }
  // All other routes (home, API, etc.) are public by default
});

export const config = {
  matcher: [
    // Skip static files & Next.js internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    
    // Always run on API/TRPC
    "/(api|trpc)(.*)",
  ],
};