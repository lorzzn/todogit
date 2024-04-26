import { withAuth } from "next-auth/middleware"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const getPathname = () => {
  return headers().get("x-pathname")
}

export default withAuth(
  function middleware(request: NextRequest) {
    const headers = new Headers(request.headers)
    const { pathname } = request.nextUrl
    headers.set("x-pathname", pathname)

    return NextResponse.next({ headers })
  },
  {
    pages: {
      signIn: "/signin",
    },
  },
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
