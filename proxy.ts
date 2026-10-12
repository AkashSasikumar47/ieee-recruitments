import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@ieee/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!pathname.startsWith("/admin") || (user ? !isLogin : isLogin)) {
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = user ? "/admin" : "/admin/login";
  url.search = "";
  const redirect = NextResponse.redirect(url);
  for (const cookie of response.cookies.getAll()) {
    redirect.cookies.set(cookie);
  }
  return redirect;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/:path*"],
};
