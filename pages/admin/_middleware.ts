import { decode } from "next-auth/jwt";
import {
  NextRequest,
  NextResponse,
  NextFetchEvent,
  NextMiddleware,
} from "next/server";

const middleware: NextMiddleware = async (
  req: NextRequest,
  ev: NextFetchEvent
) => {
  const session = await decode({
    secret: process.env.NEXT_AUTH_SECRET as string,
    token: req.cookies["next-auth.session-token"],
  });

  if (session) {
  } else {
    return NextResponse.redirect("/login");
  }
};

export default middleware;
