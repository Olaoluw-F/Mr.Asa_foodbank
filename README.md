# Mr. ASA Food Hub

The Mr. ASA food-security website for Prince George's County, with a section for UMD students. Built with React and Vite.

> **Working on this project, as a person or an AI?** Read [Context.md](Context.md) first. It has the plan, the decisions, the to-do list, and a log of what's been done.

## Run it

You need [Node.js](https://nodejs.org) 22.22 or newer.

```
npm install       # once
npm run dev       # starts a local server; open the link it prints
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the site into `dist/` |
| `npm run preview` | Serves the built site locally |
| `npm test` | Runs the tests |
| `npm run lint` | Checks the code |

## Pages

| Page | Address |
|---|---|
| Home | `/` |
| Find Food | `/food`. Filters show up in the address, like `/food?town=Laurel&day=Mon`, so you can share a filtered list. |
| Volunteer | `/volunteer` |
| Donate | `/donate`. The Burkina Faso and Nigeria section is `/donate#africa`. |
| UMD Students | `/umd` |
| About and FAQ | `/about`. The FAQ is `/about#faq`. |

Links from the first version of the site (like `/#food`) still work. They redirect to the new pages.

## Editing content

Most updates only touch the data files. You don't need to know React for these:

| What | File |
|---|---|
| County food sites | `src/data/pg-county-food-sites.json` (taken from `data-sources/Pantry Map - as of May 29 2026.xlsx`) |
| Volunteer opportunities (sample rows for now) | `src/data/volunteer.js` |
| UMD student orgs and campus programs | `src/data/umdOrgs.js`. Collect details with `data-sources/umd-student-orgs-template.csv`. Leave a field as `""` to hide it. |
| UMD campus help and regional services | `src/data/foodResources.js` |
| Charities for Burkina Faso and Nigeria | `src/data/charities.js` |

The rest of the page text is in `src/pages/<page>/`. When you change data, also update its "verified" or "checked" date on the page.

## Hosting

`npm run build` creates plain static files in `dist/`. Any host can serve them, as long as it sends unknown paths to `/index.html` so that `/food` still works when someone refreshes the page. For setup on Netlify, Vercel, Cloudflare Pages, or GitHub Pages, see "Hosting requirements" in [Context.md](Context.md).

## To do

See the Roadmap in [Context.md](Context.md).
