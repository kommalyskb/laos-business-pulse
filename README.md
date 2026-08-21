# Laos Business Pulse 2026

An interactive Lao-language report on the business environment in the Lao PDR,
covering labor and skills, access to finance, governance, macroeconomic risk,
digital payments, capital-raising risks, and practical recommendations.

The live owner-only deployment is managed separately through OpenAI Sites.

## What is included

- Lao-language executive summary and detailed analysis
- Drill-down sections with evidence and recommendations
- Responsive CSS charts and data cards
- Sector analysis for finance, lotteries, government projects, digital services,
  and less-visible resilient businesses
- Scam-risk due-diligence checklist
- 2026–2028 analytical scenarios
- Linked primary sources from the World Bank, IMF, ADB, ILO, Bank of the Lao
  P.D.R., and Transparency International
- Licensed-source photo credits displayed in the report

## Run locally

Requirements:

- Node.js 22.13 or newer
- npm

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

The Sites-compatible production build is written to `dist/`.

## Reuse and customize

The main files are:

- `app/page.tsx` — report content, data, source links, and interactions
- `app/globals.css` — design system, charts, and responsive layout
- `app/layout.tsx` — page metadata and social preview settings
- `public/` — report photography, favicon, and social preview image
- `.openai/hosting.json` — OpenAI Sites project binding

To reuse the report for a different subject or year:

1. Update the source list and all evidence in `app/page.tsx`.
2. Update the visible report date and the metadata in `app/layout.tsx`.
3. Replace credited images in `public/`, or verify that your intended use is
   allowed by the image owner.
4. Replace `public/og.png` with a new 1200×630 social preview.
5. If deploying as a separate OpenAI Site, remove the existing `project_id`
   from `.openai/hosting.json` before creating the new Site.
6. Run `npm run build` before publishing.

## Data and editorial caveats

- Statistical reference years differ by source.
- CPI is a perception index, not a count of proven corruption cases.
- The 2026–2028 scenarios are editorial analysis, not official forecasts.
- The scam checklist is an initial screening tool, not legal or investment
  advice.
- The report does not accuse any named person, company, bank, or institution.

## License

No open-source license has been selected yet. The repository owner retains all
rights to the original code and editorial content. Third-party photographs and
source materials remain subject to their respective owners' terms.
