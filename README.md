
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/adddc3b5-fa30-4c39-8928-12f36c260814

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/adddc3b5-fa30-4c39-8928-12f36c260814) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (for backend functionality)

## Supabase Integration for Anonymous User Data Collection

This project includes a Supabase integration for collecting anonymous user data from the AI Personal Stylist dashboard. The integration preserves all existing dashboard functionality while adding data collection capabilities.

### Project Structure

The project is organized as follows:

- `/src/lib` - Utility functions for Supabase integration
  - `supabase.ts` - Supabase client initialization
  - `sessionUtils.ts` - Session ID management
  - `transcriptService.ts` - Functions for saving and retrieving chat transcripts

- `/src/backend/migrations` - SQL migration scripts for Supabase database setup
  - `01_create_chat_transcripts.sql` - Creates the chat_transcripts table

- `/src/components/dashboard` - Dashboard UI components including the enhanced ChatBot

### Setting Up the Supabase Integration

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy the `.env.example` file to `.env` and fill in your Supabase URL and anon key
3. Run the migration script in the Supabase SQL editor to create the necessary tables

```sql
-- Run this in the Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS chat_transcripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  transcript_text TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_chat_transcripts_session_id ON chat_transcripts (session_id);
CREATE INDEX IF NOT EXISTS idx_chat_transcripts_timestamp ON chat_transcripts (timestamp);
```

### How It Works

1. When a user visits the site, a unique session ID is generated and stored in localStorage
2. As the user interacts with the ChatBot, their messages and the AI's responses are saved to Supabase
3. Each transcript entry includes:
   - The message text
   - Session ID for anonymous user tracking
   - Timestamp
   - Metadata with context about the interaction

### Retrieving and Analyzing Data

The `transcriptService.ts` file provides functions for retrieving transcripts with various filtering options:

- Filter by session ID to see a complete user conversation
- Filter by date range to analyze trends over time
- Limit results for pagination

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/adddc3b5-fa30-4c39-8928-12f36c260814) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
