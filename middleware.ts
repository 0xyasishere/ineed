import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/server";

const ROOT_DOMAIN = "ineed.web.id";
const APP_DOMAIN = "app.ineed.web.id";

function getHostname(request: NextRequest): string {
  return request.headers.get("x-forwarded-host") || request.nextUrl.hostname;
}

function isRootDomain(hostname: string): boolean {
  return (
    hostname === ROOT_DOMAIN ||
    hostname === `www.${ROOT_DOMAIN}` ||
    hostname === "localhost" ||
    hostname.endsWith(".localhost")
  );
}

function isAppSubdomain(hostname: string): boolean {
  return hostname === APP_DOMAIN || hostname === "app.localhost";
}

function isPreviewDeployment(hostname: string): boolean {
  return (
    hostname.includes(".vercel.app") &&
    !hostname.startsWith(ROOT_DOMAIN) &&
    !hostname.startsWith(APP_DOMAIN)
  );
}

export async function middleware(request: NextRequest) {
  const hostname = getHostname(request);
  const { pathname } = request.nextUrl;

  // Preview deployments
  if (isPreviewDeployment(hostname)) {
    const access = request.nextUrl.searchParams.get("access");
    if (access === "app") {
      return updateSession(request);
    }
    return NextResponse.next();
  }

  // App subdomain
  if (isAppSubdomain(hostname)) {
    // Root of app subdomain → redirect to /dashboard
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // Protect dashboard routes (not auth routes)
    if (pathname.startsWith("/dashboard")) {
      return updateSession(request);
    }

    return NextResponse.next();
  }

  // Root domain
  if (isRootDomain(hostname)) {
    // Block dashboard routes on root domain
    if (pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
