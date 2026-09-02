# NBB Bank Ideas

An internal ideas board for NBB employees: submit an idea, and let colleagues
back it, discuss it, and track how far it has got. Built with Next.js (App
Router) and Supabase, deployed on Vercel.

## Set up

1. Run everything in [`supabase.sql`](supabase.sql) in the Supabase SQL editor.
   That creates the `ideas` and `comments` tables and their access policies.
   On a project created before categories existed, run
   [`supabase-upgrade.sql`](supabase-upgrade.sql) as well — it adds the
   `category` column and seeds fourteen example ideas.
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
| Insights, categories and filters | `feature/insights` |

Each feature is a separate component under `components/`, plugged into
`components/IdeaCard.js` at its own marker line. Because the markers are kept
apart, the three branches never edit neighbouring lines and merge cleanly.

`feature/insights` builds on the other three, so merge those first.

## Charts

The charts are hand-drawn HTML and SVG — no charting library, so the bundle stays
small and the marks match the rest of the design. Two rules worth keeping if you
extend them:

- Categories use a fixed colour order, so a category keeps its colour when a
  filter changes what is on screen. Colour follows the entity, never its rank.
- The four status stages are ordered, so they take one hue stepped light to dark
  rather than four unrelated colours.

Every bar carries a visible label and value, so nothing is identified by colour
alone. The palettes were checked for colour-blind separation and contrast before
being used.

## Team workflow

Nobody commits to `main`. Branch → commit → push → Pull Request → review → merge.
