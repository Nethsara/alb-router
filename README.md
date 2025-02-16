# ALB Router

[![NPM Version](https://img.shields.io/npm/v/alb-router.svg)](https://www.npmjs.com/package/alb-router)
[![License](https://img.shields.io/npm/l/alb-router.svg)](#license)
[![Issues](https://img.shields.io/github/issues/Nethsara/alb-router.svg)](https://github.com/Nethsara/alb-router/issues)

A **user-friendly router** for **Amazon Application Load Balancer (ALB)** paths. Quickly **match URLs**, **extract parameters**, and **handle routing** in Node.js or AWS environments.

---

## Overview

- **Powerful & Flexible**: Leverages [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for robust path matching.
- **Easy ALB Integration**: Ideal for Amazon AWS load balancer setups, but also applicable to any Node.js server handling URL routing.
- **Lightweight**: Designed to be minimal yet fully featured for route parsing and parameter extraction.
- **TypeScript-Ready**: Includes type definitions for seamless integration in TypeScript projects.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Examples](#examples)
5. [API Reference](#api-reference)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- **Dynamic Route Matching**: Match complex patterns using path parameters and wildcards.
- **AWS-Friendly**: Specifically designed for Amazon AWS Application Load Balancer (ALB) routing rules.
- **Parameter Extraction**: Retrieve URL parameters for further processing.
- **Method-Based Handlers**: Organize your route handlers by HTTP method (e.g., GET, POST, PUT, DELETE).
- **Zero Config**: Start routing with minimal code changes—just define your routes.

---

## Installation

Install via [npm](https://www.npmjs.com/package/alb-router):

```bash
npm install alb-router
```

Or via [yarn](https://classic.yarnpkg.com/lang/en/):

```bash
yarn add alb-router
```

---

## Usage

Below is a quick example showing how to set up routes and extract parameters:

```ts
import { extractParams } from "alb-router";

const routes = [
  {
    pattern: "/users/:userId",
    methods: {
      GET: "getUserHandler",
      POST: "createUserHandler",
    },
  },
  {
    pattern: "/products/:category/:productId",
    methods: {
      GET: "getProductHandler",
    },
  },
];

const path = "/products/electronics/12345";
const method = "GET";

const { params, handler } = extractParams(path, method, routes);

console.log(params);
// Output: { category: "electronics", productId: "12345" }

console.log(handler);
// Output: "getProductHandler"
```

> **Tip**: This function is particularly useful in AWS Lambda functions triggered by an ALB event where you need to parse the `path` from the event.

---

## Examples

### 1. Simple Route Matching

```ts
import { extractParams } from "alb-router";

const routes = [
  {
    pattern: "/hello/:name",
    methods: {
      GET: "sayHello",
    },
  },
];

const path = "/hello/John";
const method = "GET";

const result = extractParams(path, method, routes);
console.log(result.params); // { name: "John" }
console.log(result.handler); // "sayHello"
```

### 2. Handling Multiple Methods

```ts
const routes = [
  {
    pattern: "/api/data",
    methods: {
      GET: "fetchData",
      POST: "createData",
      PUT: "updateData",
    },
  },
];

const getResult = extractParams("/api/data", "GET", routes);
console.log(getResult.handler); // "fetchData"

const postResult = extractParams("/api/data", "POST", routes);
console.log(postResult.handler); // "createData"
```

### 3. Nested or Wildcard Routes

```ts
const routes = [
  {
    pattern: "/files/*",
    methods: {
      GET: "fetchFiles",
    },
  },
];

const result = extractParams("/files/docs/2025/report.pdf", "GET", routes);
console.log(result.params); // { '0': 'docs/2025/report.pdf' }
console.log(result.handler); // "fetchFiles"
```

---

## API Reference

### `extractParams(path: string, method: string, routes: Route[]): ExtractParamsResult`

**Arguments:**

- **path** - The request path (e.g., `"/users/123"`).
- **method** - The HTTP method (e.g., `"GET"`, `"POST"`).
- **routes** - An array of route definitions:
  ```ts
  export type Route = {
    pattern: string;
    methods: {
      [key: string]: string;
    };
  };
  ```

**Returns:**

```ts
export type ExtractParamsResult = {
  params: { [key: string]: string };
  handler: string | null;
};
```

- `params` - Captured route parameters.
- `handler` - The method handler if found, otherwise `null`.

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/Nethsara/alb-router/issues).

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-new-feature`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/my-new-feature`.
5. Open a Pull Request.

If you find a bug or have a feature request, please [create an issue](https://github.com/Nethsara/alb-router/issues) describing it.

---

## License

[ISC](./LICENSE) © [Nethsara](https://github.com/Nethsara)  
This project is not affiliated with or endorsed by **Amazon** or **AWS**. Amazon and AWS are registered trademarks of Amazon.com, Inc.

---

### Keywords & Tags

`alb`, `router`, `routing`, `amazon`, `aws`, `application-load-balancer`, `url-params`, `path-matching`, `nodejs`, `typescript`, `path-to-regexp`

---

<sub>_For more details, visit the [GitHub repository](https://github.com/Nethsara/alb-router). Happy routing!_</sub>
