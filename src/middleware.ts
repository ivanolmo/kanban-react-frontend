import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // get the pathname of the request
  const path = req.nextUrl.pathname;

  // check if the user is logged in
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // protected paths are /boards and /reports, so we check if the path is one of those
  const isProtected = path === "/boards" || path === "/reports";

  // redirects:
  // if the user is not logged in and the path is protected, redirect to /auth
  // if the user is logged in and the path is / or /auth, redirect to /boards
  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/auth", req.url));
  } else if (session && (path === "/" || path === "/auth")) {
    return NextResponse.redirect(new URL("/boards", req.url));
  }
  return NextResponse.next();
}
