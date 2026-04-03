import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/bible(.*)",
  "/plan(.*)",
  "/progress(.*)",
  "/favorites(.*)",
  "/vault(.*)",
  "/badges(.*)",
  "/search(.*)",
  "/settings(.*)",
  "/profile(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
