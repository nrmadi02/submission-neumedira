import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  if (req.nextUrl.pathname == "/login") {
    const token = req.cookies.get("book-token");
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (req.nextUrl.pathname !== "/login") {

    const token = req.cookies.get("book-token");
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login", "/", "/my-shelf/:path*"],
};
