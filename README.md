# Divide Like a King

This repository contains a Create React App located in the `my-app` directory. All source files live under `my-app/src`.

## Setup

Install dependencies and start the development server:

```bash
cd my-app
npm install
npm start
```

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
