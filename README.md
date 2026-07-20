# iNeed - Freelance Marketplace

Marketplace freelance berbasis manga/comic book design, dibangun dengan Next.js 16, Tailwind CSS 4, dan Supabase.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 + custom manga design system
- **Database:** Supabase (PostgreSQL + RLS)
- **Auth:** Supabase Auth (Email/Password + OAuth)
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Language:** TypeScript

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase keys

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_service_role_key
```

## Database Setup

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor to create all tables and RLS policies.

## Project Structure

```
app/
├── (landing)/          # Public pages (home, auth)
│   ├── auth/login/
│   ├── auth/register/
│   ├── services/[id]/
│   └── jobs/[id]/
├── (dashboard)/        # Protected dashboard pages
│   ├── dashboard/
│   │   ├── page.tsx    # Overview
│   │   ├── post/       # Post service/job
│   │   ├── my-posts/   # Manage listings
│   │   ├── proposals/  # View proposals
│   │   ├── messages/   # Conversations
│   │   ├── earnings/   # Charts + transactions
│   │   ├── campaigns/  # Marketing campaigns
│   │   ├── profile/    # Edit profile
│   │   └── settings/   # Account settings
│   └── auth/callback/
├── layout.tsx          # Root layout
└── not-found.tsx       # 404 page

components/
├── dashboard/          # Sidebar, TopNavbar
├── ui/                 # DataTable, FormField, Skeleton, etc.
├── manga/              # Manga-style elements
└── Cards.tsx           # Service & Job cards

lib/
├── auth.tsx            # AuthProvider + useAuth
├── i18n.tsx            # Indonesian/English i18n
├── supabase/           # Client & server Supabase helpers
├── validations.ts      # Zod schemas
└── table-columns.tsx   # DataTable column definitions
```

## Features

- Manga/comic book design system
- Indonesian & English language support
- Responsive mobile sidebar navigation
- Real-time data from Supabase
- Earnings charts (Area + Bar)
- Service & job detail pages
- Profile with social links
- Settings with notification toggles

## License

MIT
