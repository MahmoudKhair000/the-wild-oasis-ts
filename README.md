# The Wild Oasis

A modern cabin booking and guest management app built with Next.js, TypeScript, Supabase, and Google authentication. The app lets guests browse luxury cabins, filter them by capacity, check availability, create and manage reservations, and update their profile.

This project is a TypeScript version of the classic "The Wild Oasis" booking experience, adapted for the App Router and server actions in Next.js.

## Overview

The Wild Oasis is a fictional luxury cabin rental website inspired by boutique resort experiences. The application supports:

- Cabin catalog browsing with filtering
- Reservation creation and validation
- Booking management for authenticated guests
- User profile updates with country and nationality information
- Google sign-in via NextAuth
- Supabase-powered persistence for cabins, guests, bookings, and settings

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- NextAuth (Google OAuth)
- date-fns
- Heroicons

## Project Structure

```text
.
├── app/
│   ├── _components/        # UI components
│   ├── _contexts/          # Reservation context
│   ├── _lib/               # auth, Supabase, actions, data service
│   ├── _types/             # TypeScript interfaces
│   ├── _styles/            # global styles
│   ├── about/              # About page
│   ├── account/            # Guest dashboard and booking management
│   ├── api/auth/[...nextauth]/route.js
│   ├── cabins/             # Cabin listing and booking pages
│   ├── login/              # Authentication page
│   ├── layout.tsx          # root layout and metadata
│   ├── page.tsx            # landing page
│   └── ...
├── public/                 # static assets
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── pnpm-lock.yaml
├── README.md
└── .gitignore
```

## Key Features

### Guest Authentication

Authentication is handled with NextAuth and Google sign-in. The app configures custom callbacks to:

- enforce access control
- create a guest row on first Google sign-in
- populate the session with the guest ID for authorization checks

### Cabin Listings

The cabins page shows luxury cabins and allows filtering by guest capacity. The list is fetched from Supabase and rendered server-side with dynamic search params.

### Booking Flow

Guests can:

- select a cabin
- choose a date range
- view booked dates and unavailable days
- submit a booking
- view reservation confirmation

Booking creation and updates are performed using server actions and are protected by user session checks.

### Reservation Management

Authenticated users can access their booking records and:

- view existing reservations
- update guest counts or notes
- delete bookings they own

These actions validate that the user is the owner of the reservation before performing database updates.

### Profile Management

Users can update their guest information, including:

- national ID
- nationality
- country flag metadata

This is stored in the `guests` table in Supabase.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 20+
- pnpm (recommended) or npm
- A Supabase project
- A Google OAuth app for authentication

### Install dependencies

```bash
pnpm install
```

or:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_service_role_or_anon_key
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_SECRET=your_random_session_secret
```

Notes:

- `SUPABASE_URL` is the URL of your Supabase project.
- `SUPABASE_SECRET_KEY` is used by the app to connect to the database.
- `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` come from your Google OAuth credentials.
- `AUTH_SECRET` is required by NextAuth for secure session handling.

### Run the app locally

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Available Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

Use them as follows:

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## App Flow and Architecture

### Server Components + Server Actions

This project uses the Next.js App Router pattern:

- pages and layouts live under `app/`
- page data is loaded with async server components
- database mutations are handled by server actions in `app/_lib/actions.ts`

This pattern keeps business logic close to the feature area and helps centralize authorization checks.

### Data Layer

The main data access logic is in:

- `app/_lib/data-service.ts` for reading and transforming database records
- `app/_lib/supabase.ts` for the shared Supabase client instance

The app reads and writes records for:

- `cabins`
- `guests`
- `bookings`
- `settings`

### Authentication Flow

The auth setup in `app/_lib/auth.ts` does the following:

1. Configures Google as the identity provider
2. Blocks unauthorized access via `authorized()`
3. Ensures a guest row exists when a user signs in
4. Adds the guest ID to the session for authorization checks

### Authorization in Bookings

Before a user can update or delete a reservation, the app:

- loads the user’s bookings
- compares IDs against the requested booking
- throws an error when the reservation does not belong to the signed-in guest

This pattern prevents users from modifying other users’ reservations.

## Database and Supabase Notes

This application expects a Supabase project with the following table concepts:

- `cabins` - cabin metadata like name, price, capacity, and image
- `guests` - guest profile data, including email, name, nationality, and national ID
- `bookings` - reservations with dates, guests, cabin references, pricing, and status
- `settings` - website or business configuration data

The data access methods use calls like:

```ts
supabase.from('cabins').select('*')
```

and rely on both the URL and secret key being available through environment variables.

## Booking Logic Highlights

The booking system includes:

- blocked date calculation from existing bookings
- capacity-aware filtering
- total price calculations
- guest authorization checks
- confirmation redirect after successful booking

## Styling

The UI uses Tailwind CSS for layout, spacing, colors, and component styling. The project also uses custom color tokens and typography that fit the brand aesthetic of a luxury lodge.

## Deployment

This app is designed for deployment on platforms that support Next.js, especially:

- Vercel
- self-hosted Node environments

For production deployment, make sure to configure:

- environment variables in the deployment platform
- Google OAuth credentials and redirect URIs
- Supabase project access and URL settings
- secure secret values for `AUTH_SECRET`

## Troubleshooting

### Supabase connection issues

Check that:

- `SUPABASE_URL` is valid
- `SUPABASE_SECRET_KEY` has the correct permission level
- your database tables exist and match the app contract

### Authentication issues

Check that:

- Google OAuth client ID and secret are correct
- the redirect URL matches your app configuration
- `AUTH_SECRET` is set

### Booking actions fail

Most server actions verify the logged-in guest first. If a booking update or delete fails, confirm:

- the user is signed in
- the reservation belongs to that guest
- the booking still exists in the database

## Project Status

This is an educational and demo-quality project for learning modern Next.js patterns, server actions, App Router, TypeScript, and Supabase integration.

## License

This project is intended for learning and experimentation. Add a license file if you want to publish or share it publicly under a specific license.

## Related Files

- [app/_lib/auth.ts](app/_lib/auth.ts)
- [app/_lib/data-service.ts](app/_lib/data-service.ts)
- [app/_lib/actions.ts](app/_lib/actions.ts)
- [app/cabins/page.tsx](app/cabins/page.tsx)
- [app/account/page.tsx](app/account/page.tsx)
- [app/layout.tsx](app/layout.tsx)

## Notes

This README is meant to document the project as it currently exists in this repository. If you add new modules, routes, or database tables, update this file so the documentation remains accurate.
