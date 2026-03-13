# Wargames.Institute

A professional, high-tech, tactical-looking business website for Wargames.Institute - a research and education platform dedicated to using wargames and simulations to understand complex systems and train strategic thinking.

## Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS with custom tactical design system
- **Animations**: Framer Motion
- **CMS**: Sanity.io (for blog, educational content, case studies, resources)
- **Deployment**: Vercel (recommended)

## Design System

The site features a futuristic tactical aesthetic inspired by military command centers and war rooms:

- **Color Palette**: Dark backgrounds with strategic blue/cyan accents and tactical amber highlights
- **Typography**: Inter (body) and JetBrains Mono (tactical/data displays)
- **Visual Elements**: Hex grids, tactical overlays, glitch effects, command center UI

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing (CMS-driven)
│   ├── case-studies/      # Case studies (CMS-driven)
│   ├── contact/           # Contact page
│   ├── education/         # Education programs
│   ├── projects/          # Projects & simulations
│   ├── research/          # Research division
│   ├── resources/         # Resource library (CMS-driven)
│   ├── layout.tsx         # Root layout with Header/Footer
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── ui/                # Reusable UI components (Button, Card, etc.)
│   ├── sections/          # Page sections (Hero, Mission, etc.)
│   └── interactive/       # Interactive demos (to be implemented)
├── lib/
│   └── sanity/            # Sanity client configuration
└── sanity/
    └── schemas/           # Sanity content schemas
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Sanity.io account (free tier is sufficient to start)

### Installation

1. **Run the development server**:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sanity CMS Setup (Next Steps)

### 1. Create a Sanity Project

Option A - Using Sanity CLI:
```bash
npm create sanity@latest
```

Option B - Via Sanity.io Dashboard:
1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project
3. Note your Project ID

### 2. Configure Environment Variables

Copy the example file and update with your Sanity details:
```bash
cp .env.local.example .env.local
```

Update `.env.local` with your Sanity project details:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
```

### 3. Content Types (Planned)

The following content types are ready to be configured in Sanity:

- **blogPost**: Blog articles with categories, tags, and rich content
- **caseStudy**: Detailed project analyses and strategic breakdowns
- **resource**: Downloadable materials, frameworks, and tools
- **project**: Simulations and wargames portfolio
- **course**: Educational content and learning modules
- **newsletterSignup**: Email capture for waitlists

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard:
   - Add all variables from `.env.local`

4. **Connect your domain** (wargames.institute):
   - In Vercel project settings > Domains
   - Add your custom domain
   - Configure DNS records as instructed

## Customization

### Colors

Edit `app/globals.css` to customize the tactical color palette:

```css
:root {
  --tactical-blue: #3d5a80;
  --tactical-cyan: #4a9fb8;
  --tactical-amber: #d4a564;
  /* ... */
}
```

### Components

All UI components are in `components/ui/`:
- `Button` - Tactical styled buttons
- `Card` - Military briefing card layouts
- `GridOverlay` - Hex/square grid patterns
- `GlitchText` - Subtle glitch effects
- `TacticalDivider` - Section dividers

## What's Built

### Completed
- ✅ Next.js project with TypeScript
- ✅ Tactical design system (colors, fonts, animations)
- ✅ Core UI component library
- ✅ Responsive Header with navigation
- ✅ Tactical Footer
- ✅ Home page with Hero and Mission sections
- ✅ About page (full business description)
- ✅ Contact page with form
- ✅ Placeholder pages (Research, Education, Projects, Blog, Case Studies, Resources)

### Next Steps
1. Set up Sanity CMS and create content schemas
2. Implement dynamic blog routes with CMS data
3. Build interactive demos (hex grid, wargame simulation)
4. Add newsletter signup functionality
5. Implement user authentication for premium content (future)

## Support

For questions or issues:
- Email: contact@wargames.institute
- Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
- Sanity Docs: [https://www.sanity.io/docs](https://www.sanity.io/docs)

## License

Copyright © 2026 Wargames.Institute. All rights reserved.
