
# Outfit Insight Engine

A data analytics dashboard with an AI-powered chatbot for fashion retail insights.

## Project Structure

This project is organized with a clear separation of frontend and backend components:

```
/backend/
  /migrations/         - Database schema and migration files
  /supabase/           - Supabase client and utility functions
  /api/                - API services and data access functions

/frontend/
  /components/         - UI components including the chatbot
  /dashboard/          - Main dashboard interface components
  /hooks/              - Custom React hooks

/supabase/
  /functions/          - Supabase Edge Functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Supabase account for the backend

### Setup

1. Clone the repository
```sh
git clone <repository-url>
cd outfit-insight-engine
```

2. Install dependencies
```sh
npm install
```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Fill in your Supabase connection details

```sh
cp .env.example .env
```

4. Run migrations on your Supabase project
   - Navigate to your Supabase Dashboard
   - Go to the SQL Editor
   - Execute the SQL migrations found in `/backend/migrations/`

5. Start the development server
```sh
npm run dev
```

## Backend Setup

### Supabase Configuration

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Set up the required tables using the migration file at `/backend/migrations/01_create_chat_transcripts.sql`
3. Enable Row Level Security (RLS) with appropriate policies
4. Configure Edge Functions in your Supabase project

### Backend Directory Structure

- `/backend/migrations/` - Contains SQL migration files for database schema
- `/backend/supabase/` - Contains Supabase client initialization and utility functions
- `/backend/api/` - Contains service functions for data access

## Frontend Development

The frontend is built with React, TypeScript, and Tailwind CSS, providing a responsive dashboard with visualization components and an AI chatbot.

### Frontend Directory Structure

- `/frontend/dashboard/` - Main dashboard interface components
- `/frontend/components/` - Reusable UI components including the chatbot
- `/frontend/hooks/` - Custom React hooks for frontend functionality

### Key Components

- **Dashboard**: Displays KPIs, charts, and analytics
- **ChatBot**: Allows users to query the data using natural language
- **Data Visualization**: Uses Recharts to visualize analytics data

## Edge Functions

This project uses Supabase Edge Functions for secure database access:

- `save-transcript`: Stores chat conversations securely
- `get-transcripts`: Retrieves conversation history with flexible filtering

## License

This project is licensed under the MIT License - see the LICENSE file for details.
