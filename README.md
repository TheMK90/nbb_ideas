# NBB Bank Ideas

A small internal ideas board for NBB employees: submit an idea, and let colleagues
react to it. Plain HTML, CSS and JavaScript on the front end, with Supabase as the
database.

## Set up

1. Open the Supabase SQL editor and run everything in [`supabase.sql`](supabase.sql).
   That creates the `ideas` and `comments` tables and their access policies.
2. The project URL and anon key are already in `js/store.js`. The anon key is a
   public client-side key — row level security is what protects the data.

## Run it

Serve the folder and open it in a browser (opening the file directly works too):

```
python -m http.server 8000
```

## Team features

| Feature | Branch | Owner |
| --- | --- | --- |
| Upvoting | `feature/upvoting` | member 1 |
| Comments | `feature/comments` | member 2 |
| Idea status | `feature/idea-status` | member 3 |

Features plug into the base app through `App.cardExtras` so each one lives in its
own file under `js/` and branches merge cleanly.

## Team workflow

Nobody commits to `main`. Branch → commit → push → Pull Request → review → merge.
