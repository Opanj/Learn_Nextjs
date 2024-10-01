import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import withAuth from "./middleware/withAuth";

export function mainMiddleware(req: NextRequest) {
  // membuat validated login
  // const isLogin = false;
  // if (!isLogin) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  // } else {
  //   return NextResponse.next();
  // }
  const res = NextResponse.next();
  return res;
}

// untuk menghendel redirect
// export const config = {
//   matcher: ["/product", "/about"], // untuk menghendel lebih dari satu path
// };

export default withAuth(mainMiddleware, ["/profile", "/admin"]);

// admin disetting di withAuth
