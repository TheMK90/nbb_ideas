# NBB Bank Ideas

An internal ideas board for NBB employees: submit an idea, and let colleagues
back it, discuss it, and track how far it has got. Built with Next.js (App
Router) and Supabase, deployed on Vercel.

## Set up

1. Run everything in [`supabase.sql`](supabase.sql) in the Supabase SQL editor.
   That creates the `ideas` and `comments` tables and their access policies.
2. Copy `.env.example` to `.env.local` and fill in your Supabase project URL and
   anon key (Supabase → Project Settings → API). `.env.local` is gitignored, so
   every teammate keeps their own copy.
3. Install and run:

   ```
   npm install
   npm run dev
   ```

   The app is at http://localhost:3000.

The anon key is the public client-side key and is meant to reach the browser,
which is why it is prefixed `NEXT_PUBLIC_`. Row level security is what protects
the data. A `service_role` key is a real secret and must never be `NEXT_PUBLIC_`.

## Deploying

The project is deployed on Vercel from the `main` branch. Add the same two
environment variables in the Vercel project settings. Every merge into `main`
redeploys automatically, and each Pull Request gets its own preview URL.

## Team features

| Feature | Branch |
| --- | --- |
| Upvoting | `feature/upvoting` |
| Comments | `feature/comments` |
| Idea status | `feature/idea-status` |

Each feature is a separate component under `components/`, plugged into
`components/IdeaCard.js` at its own marker line. Because the markers are kept
apart, the three branches never edit neighbouring lines and merge cleanly.

## Team workflow

Nobody commits to `main`. Branch → commit → push → Pull Request → review → merge.
