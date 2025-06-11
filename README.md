# Divide Like a King

This project contains React components for teaching long division and multiplication.

## Setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Build the project with:

```bash
npm run build
```

Serve the production build locally:

```bash
npm start
```

## Alias Configuration

The code imports modules using the `@/` prefix, for example:

```js
import { Button } from '@/components/ui/button';
```

When using Vite, add the following alias configuration to `vite.config.js` so `@/` resolves to the project root:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
});
```

This allows absolute imports from the root directory.
