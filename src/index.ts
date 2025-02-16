import { match } from "path-to-regexp";
import { Route, ExtractParamsResult } from "./interfaces/types";

export const extractParams = (
  path: string,
  method: string,
  routes: Route[]
): ExtractParamsResult => {
  for (const route of routes) {
    const matchFunc = match(route.pattern, { decode: decodeURIComponent });
    const matched = matchFunc(path);
    if (matched && route.methods[method]) {
      const params: { [key: string]: string } = {};
      for (const key in matched.params) {
        if (typeof matched.params[key] === "string") {
          params[key] = matched.params[key];
        }
      }
      return { params, handler: route.methods[method] };
    }
  }
  return { params: {}, handler: null };
};
