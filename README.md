GraphQL Frontend Demo Guide

Quick start

1. Install dependencies:

```bash
npm install
```

2. Confirm the GraphQL endpoint in `.env.local` (default provided):

[.env.local](.env.local#L1)

3. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000

What this repo shows

- Client GraphQL with Apollo (`useQuery`) inside client components.
- Server-side GraphQL with native `fetch` (Server Components, `getServerSideProps`).
- Examples for both App Router and Pages Router to compare approaches.

Files of interest

- Home / launcher: [app/page.tsx](app/page.tsx#L1)
- App Router server demo: [app/server-demo/page.tsx](app/server-demo/page.tsx#L1)
- App Router client demo: [app/client-demo/page.tsx](app/client-demo/page.tsx#L1)
- Pages Router server demo: [pages/pages-server-demo.tsx](pages/pages-server-demo.tsx#L1)
- Pages Router client demo: [pages/pages-client-demo.tsx](pages/pages-client-demo.tsx#L1)
- GraphQL query + fetch helper: [lib/queries/get-country.ts](lib/queries/get-country.ts#L1)
- Apollo (App Router): [lib/apollo-client.ts](lib/apollo-client.ts#L1), [lib/apollo-wrapper.tsx](lib/apollo-wrapper.tsx#L1)
- Apollo (Pages): [lib/apollo-pages-client.ts](lib/apollo-pages-client.ts#L1)

Quick notes for reviewers

- Change the country code used in the query to see different data (e.g. `"US"`, `"JP"`). The operation is defined in [lib/queries/get-country.ts](lib/queries/get-country.ts#L1).
- The launcher in [app/page.tsx](app/page.tsx#L1) has a `togglePagesRouter` flag — toggle it to view Pages Router examples.
- To demonstrate server caching vs fresh fetches, uncomment or toggle the `cache: "no-store"` line in [app/server-demo/page.tsx](app/server-demo/page.tsx#L1).
- The default GraphQL URL is set in `.env.local` as `NEXT_PUBLIC_GRAPHQL_URL`.

Commands

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start (prod): `npm run start`
