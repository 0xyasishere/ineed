import { type NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = "ineed.web.id";
const APP_DOMAIN = "app.ineed.web.id";

function getHostname(request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.nextUrl.hostname;
  return host;
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

export function middleware(request: NextRequest) {
  const hostname = getHostname(request);
  const { pathname } = request.nextUrl;

  // Preview deployments: detect via query param or serve landing by default
  if (isPreviewDeployment(hostname)) {
    const access = request.nextUrl.searchParams.get("access");
    if (access === "app") {
      // Rewrite to dashboard routes for preview
      const url = request.nextUrl.clone();
      url.pathname = pathname;
      return NextResponse.rewrite(url);
    }
    // Default: serve landing page on preview
    return NextResponse.next();
  }

  // App subdomain: rewrite /dashboard/* and /auth/* paths
  if (isAppSubdomain(hostname)) {
    const url = request.nextUrl.clone();

    // Root of app subdomain → redirect to /dashboard
    if (pathname === "/") {
      url.pathname = "/dashboard";
      return NextResponse.rewrite(url);
    }

    // All other paths on app subdomain serve as-is
    // (dashboard routes live directly under app/ root via middleware rewrite)
    return NextResponse.next();
  }

  // Root domain: serve landing page as normal
  if (isRootDomain(hostname)) {
    // Block dashboard routes on root domain
    if (pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Unknown host: serve landing
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next (Next.js internals)
     * - static files (favicon, images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
