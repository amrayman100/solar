# Bolt Energy

Monorepo for the Bolt Energy marketing site, shop, and backoffice. Backend is Convex.

```
apps/customer     Public site + shop (port 3000)
apps/backoffice   Internal admin (port 3001)
packages/ui       Shared UI (Bolt theme)
packages/models   Shared domain types and proposal math
convex/           Backend schema and functions
legacy/           Previous Next 14 + Neon app (reference while we port)
```

## Development

```bash
npm install
npx convex dev          # keep running; uses superb-caterpillar-198
npm run dev             # customer + backoffice
```

Customer: http://localhost:3000  
Backoffice: http://localhost:3001
