# Divide Like a King

This repository contains a Create React App. All source files live under `src`.

## Setup

Install dependencies and start the development server:

```bash
npm install
npm start
```

If you pull new changes that update dependencies, run `npm install` again to
ensure packages like **react-router-dom** are installed before starting the
development server.

Build the project with:

```bash
npm run build
```

## Path Alias

The code imports modules using the `@/` prefix. CRA resolves this alias using the `jsconfig.json` file:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"]
}
```

This configuration allows absolute imports from the `src` directory.
