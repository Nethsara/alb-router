import { extractParams } from "../src/index";
import { Route } from "../src/interfaces/types";

describe("extractParams", () => {
  const routes: Route[] = [
    {
      pattern: "/users/:id",
      methods: {
        GET: "getUser",
        POST: "createUser",
      },
    },
    {
      pattern: "/posts/:postId/comments/:commentId",
      methods: {
        GET: "getComment",
      },
    },
    {
      pattern: "/static/path",
      methods: {
        GET: "staticPath",
      },
    },
  ];

  it("should extract params from a simple path with one parameter", () => {
    const result = extractParams("/users/123", "GET", routes);
    expect(result.params).toEqual({ id: "123" });
    expect(result.handler).toBeTruthy();
    expect(result.handler).toBe("getUser");
  });

  it("should extract multiple params from a complex path", () => {
    const result = extractParams("/posts/456/comments/789", "GET", routes);
    expect(result.params).toEqual({ postId: "456", commentId: "789" });
    expect(result.handler).toBeTruthy();
    expect(result.handler).toBe("getComment");
  });

  it("should match static paths without parameters", () => {
    const result = extractParams("/static/path", "GET", routes);
    expect(result.params).toEqual({});
    expect(result.handler).toBeTruthy();
    expect(result.handler).toBe("staticPath");
  });

  it("should return empty params and null handler for non-matching path", () => {
    const result = extractParams("/nonexistent/path", "GET", routes);
    expect(result.params).toEqual({});
    expect(result.handler).toBeNull();
  });

  it("should return empty params and null handler for non-matching method", () => {
    const result = extractParams("/users/123", "DELETE", routes);
    expect(result.params).toEqual({});
    expect(result.handler).toBeNull();
  });

  it("should handle URL-encoded parameters", () => {
    const result = extractParams("/users/john%20doe", "GET", routes);
    expect(result.params).toEqual({ id: "john doe" });
    expect(result.handler).toBeTruthy();
    expect(result.handler).toBe("getUser");
  });
});
