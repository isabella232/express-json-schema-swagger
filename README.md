# express-json-schema-swagger

Example integration of JSON Schema with Swagger and Typescript

## Prerequisites

- Change your current directory to the project directory.
- Install all dependencies with `npm install` or `yarn install`

### Development

Start a local development server with

```
$ npm run dev
```

The swagger document gets auto-generated for you and rebuilds any time you change something on your source code.

### "Production"

This isn't meant to run in production, just saying. But you could with just

```
$ npm start
```

### Generate TypeScript types

You can generate TypeScript types from your JSON Schema (located in `src/schemas`) files with

```
$ npm run types
```

Output directory should be `dist/`.
