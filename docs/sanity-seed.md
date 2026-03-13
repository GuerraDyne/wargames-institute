# Sanity Seed Import

This project includes a ready-to-import seed file:

```text
sanity/seed/seed.ndjson
```

Optional validation:

```bash
node scripts/verify-seed.mjs
```

## Import into Sanity

Use the Sanity CLI:

```bash
npx sanity dataset import sanity/seed/seed.ndjson production --replace
```

Run that from the project root after logging into the Sanity CLI.

## What gets imported

- `siteSettings`
- `homePage`
- `researchBrief`
- `article`
- `project`
- `caseStudy`
- `resource`
- `educationProgram`

## Notes

- The website will still work without importing this file because it falls back to local content.
- Once documents exist in Sanity, the relevant listing/detail pages will use CMS data instead of fallback content.
