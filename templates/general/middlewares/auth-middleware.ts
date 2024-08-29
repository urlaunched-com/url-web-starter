import { NextFetchEvent, NextRequest } from "next/server";

import { MiddlewareFactory } from "./stack-middlewares";

const DEVELOPMENT_USER = "user";
const DEVELOPMENT_PASSWORD = "password";

export const authMiddleware: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // Check if the application is running in development mode
    const isDevelopment =
      process.env.NODE_ENV === "development" ||
      !process.env.NEXT_PUBLIC_IS_PRODUCTION ||
      process.env.NEXT_PUBLIC_IS_PRODUCTION !== "true";

    // If in development mode, check for basic authentication
    if (isDevelopment) {
      const authorizationHeader = request.headers.get("authorization");
      if (!authorizationHeader || !authorizationHeader.startsWith("Basic ")) {
        // If no or invalid authorization header, send a 401 Unauthorized response
        return new Response(null, {
          status: 401,
          statusText: "Unauthorized",
          headers: {
            "WWW-Authenticate": "Basic realm='Development Access'",
          },
        });
      }

      // Decode the base64-encoded credentials and validate against predefined values
      const encodedCredentials = authorizationHeader.replace("Basic ", "");
      const decodedCredentials = atob(encodedCredentials);

      const [username, password] = decodedCredentials.split(":");
      if (username !== DEVELOPMENT_USER || password !== DEVELOPMENT_PASSWORD) {
        // If username or password is incorrect, send a 401 Unauthorized response
        return new Response(null, {
          status: 401,
          statusText: "Unauthorized",
          headers: {
            "WWW-Authenticate": "Basic realm='Development Access'",
          },
        });
      }
    }

    return next(request, _next);
  };
};
