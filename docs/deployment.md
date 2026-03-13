# Deployment Checklist

## Vercel

Set the following environment variables in Vercel:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=pvyzepbx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-12
```

Optional later:

```env
SANITY_API_READ_TOKEN=...
```

Use the default commands:

- Install: `npm install`
- Build: `npm run build`
- Start: `npm start`

## Sanity

In Sanity Manage:

1. Open project `pvyzepbx`
2. Go to `Settings > API > CORS origins`
3. Add:
   - `http://localhost:3000`
   - your Vercel production URL
   - your final custom domain
4. Enable `Allow credentials` for Studio origins

## Recommended sequence

1. Deploy the site to Vercel
2. Add the Vercel production URL to Sanity CORS
3. Open `/studio`
4. Import the seed content or create documents manually
5. Add your final domain in Vercel
6. Add the final domain to Sanity CORS
