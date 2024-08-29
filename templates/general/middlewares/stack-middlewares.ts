import { NextMiddleware } from "next/server";

import { I18NMiddleware } from "./i18n-middleware";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export const stackMiddlewares = (functions: MiddlewareFactory[] = [], index = 0): NextMiddleware => {
  const current = functions[index];

  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }

  return I18NMiddleware;
};
