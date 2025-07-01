# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- **Development Server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build`
- **Production**: `npm start`
- **Linting**: `npm run lint`

### Testing
No test framework is currently configured. Check with the maintainer before adding testing infrastructure.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.3.3 with App Router
- **Database**: Supabase (PostgreSQL) with row-level security
- **Authentication**: Supabase Auth
- **AI Integration**: Anthropic Claude API and OpenAI API
- **UI Components**: shadcn/ui (New York style) with Tailwind CSS
- **State Management**: React Context (`AppContextProvider`)
- **External APIs**: LitCal API for liturgical calendar data

### Project Structure
```
app/                    # Next.js App Router
├── (main)/            # Protected routes requiring authentication
│   ├── dashboard/     # User dashboard and homily management
│   ├── homilies/      # Homily CRUD operations and editor
│   ├── contexts/      # Audience context management
│   └── definitions/   # User-specific definitions management
├── auth/              # Authentication pages (login, signup, etc.)
└── api/               # API routes for server actions

components/            # Reusable UI components
├── ui/               # shadcn/ui components
├── homilies/         # Homily-specific components
└── homily-wizard.tsx # Multi-step homily creation workflow

lib/
├── actions/          # Server actions for database operations
│   ├── homilies.js   # Homily CRUD operations
│   ├── ai-claude.ts  # Claude AI integration
│   ├── contexts.js   # Context management
│   └── user*.js      # User and settings management
├── supabase/         # Database client configuration
└── prompts.ts        # AI prompt templates

contexts/             # React Context providers
└── AppContextProvider.tsx # Global app state (user, settings)
```

### Database Schema
Key tables:
- `homilies`: Stores homily data with 6-step workflow fields (title, readings, definitions, questions, final_draft)
- `contexts`: User-defined audience contexts (parish, students, special events)
- `user_settings`: User-specific definitions and preferences

### Authentication Flow
- Uses Supabase Auth with email/password
- Protected routes wrapped in `(main)` directory
- User session managed via `AppContextProvider`
- User settings automatically initialized with default definitions for new users

### AI Integration
- **Claude API**: Primary AI for homily generation (`lib/actions/ai-claude.ts`)
- **OpenAI API**: Alternative AI provider (`lib/actions/ai.js`)
- AI prompts stored in `lib/prompts.ts`
- Structured 6-step homily creation workflow with AI assistance

### Homily Workflow
1. **Readings**: Import liturgical readings (LitCal API integration)
2. **Context**: Select audience context (parish, students, events)
3. **Definitions**: Apply user-specific theological definitions
4. **Questions**: Generate and refine focus questions
5. **Development**: Create homily outline and content
6. **Final Draft**: Polish and finalize homily

### Component Conventions
- Use shadcn/ui components for all UI elements
- Server components by default, mark client components with `"use client"`
- Server actions in `lib/actions/` for database operations
- TypeScript for new components, JavaScript for existing files
- Keep components under 500 lines (mentioned in README.md contributing guidelines)

### Styling
- Tailwind CSS with custom CSS variables for theming
- Dark mode support via `next-themes`
- shadcn/ui design system with "new-york" style
- Custom sidebar and chart color schemes

### Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY` (optional alternative)

### Key External Dependencies
- **LitCal API**: `https://litcal.johnromanodorazio.com/api/dev/calendar` for liturgical data
- **Magisterium.com**: Catholic teaching resources integration
- **Butler's Lives of Saints**: Faith stories database

### Development Notes
- Use server actions for all database operations
- Implement proper error handling for AI API calls
- Follow Next.js App Router conventions
- Authentication required for all main application features
- User settings include customizable theological definitions
- Multi-step wizard pattern for complex workflows