import { authMiddleware } from "./middlewares/auth-middleware";
import { MiddlewareFactory, stackMiddlewares } from "./middlewares/stack-middlewares";

const middlewares: MiddlewareFactory[] = [authMiddleware];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)", "/(de|en|es|fr|it|tr)/:path*"],
};
