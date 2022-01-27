import { getSession } from "next-auth/react";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getSession();

  if (session) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect("/login");
  }
}
