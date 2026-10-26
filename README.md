# The Wild Oasis

The Wild Oasis is a cabin booking website for a fictional lodge in the Italian
Dolomites. Guests can browse cabins, check availability, make reservations, and
manage their profile and reservations after signing in with Google.

The project is built with the Next.js App Router, React, TypeScript, Supabase,
and Auth.js (NextAuth) and is intended as a learning/demo application.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Supabase setup and data contract](#supabase-setup-and-data-contract)
- [Google OAuth setup](#google-oauth-setup)
- [Routes](#routes)
- [Application structure](#application-structure)
- [How the application works](#how-the-application-works)
- [Commands](#commands)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Limitations and project status](#limitations-and-project-status)

## Features

- Browse cabins and filter them by guest capacity.
- View cabin details, nightly prices, discounts, and availability.
- Select a date range and optionally include breakfast when making a reservation.
- Sign in with Google; a guest record is created on first sign-in.
- View, edit, and delete your own reservations in the guest area.
- Update your guest profile with nationality, a country flag, and national ID.
- Responsive layouts, loading states, error boundaries, and not-found pages.

## Technology

- Next.js 16 App Router and React 19
- TypeScript 5
- Tailwind CSS 4
- Supabase JavaScript client for application data
- Auth.js / NextAuth v5 with the Google provider
- `date-fns` and `react-day-picker` for date calculations and selection
- Heroicons
- pnpm (version declared by the package manifest)

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- pnpm (recommended; the project declares pnpm 11.20.0)
- A Supabase project with the tables and data described in
  [Supabase setup and data contract](#supabase-setup-and-data-contract)
- A Google OAuth client; see [Google OAuth setup](#google-oauth-setup)

### Install dependencies

From the repository root, install dependencies using the checked-in lockfile:

```bash
pnpm install
```

Create a `.env.local` file in the repository root and fill in the values
described in [Environment variables](#environment-variables). Then start the
development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The application reads these variables on the server:

| Variable | Required | Purpose |
| --- | --- | --- |
| `SUPABASE_URL` | Yes | URL of the Supabase project |
| `SUPABASE_SECRET_KEY` | Yes | Supabase key used by the server-side client |
| `AUTH_GOOGLE_ID` | Yes | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Yes | Google OAuth client secret |
| `AUTH_SECRET` | Yes | Secret used by Auth.js to protect session data |

Example `.env.local`:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SECRET_KEY=your_server_side_supabase_key
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
AUTH_SECRET=your_long_random_auth_secret
```

`SUPABASE_SECRET_KEY` is read by `app/_lib/supabase.ts` and must remain
server-only. Do not rename it to a `NEXT_PUBLIC_` variable, expose it to the
browser, or commit `.env.local`. Use a key with only the database permissions
required by this application and review your Supabase access policies before
deployment.

## Supabase setup and data contract

The application connects to Supabase from server-side code using the project
URL and key above. It expects the following tables and fields. Add any database
constraints or defaults required by your Supabase project; this repository does
not include SQL migrations or a database schema export.

| Table | Fields used by the application |
| --- | --- |
| `cabins` | `id`, `created_at`, `name`, `maxCapacity`, `description`, `image`, `regularPrice`, `discount` |
| `guests` | `id`, `created_at`, `email`, `fullName`, `nationalID`, `nationality`, `countryFlag` |
| `bookings` | `id`, `created_at`, `cabinId`, `guestId`, `startDate`, `endDate`, `numNights`, `numGuests`, `cabinPrice`, `extrasPrice`, `totalPrice`, `status`, `hasBreakfast`, `isPaid`, `observations` |
| `settings` | `id`, `created_at`, `minBookingLength`, `maxBookingLength`, `maxGuestsPerBooking`, `breakfastPrice` |

The `guests.email` value is used to find the guest linked to a Google account.
The Auth.js session is enriched with that guest's `id`. Booking operations use
`guestId` and `cabinId`; the reservations query also reads the related cabin's
`name` and `image`, so the `bookings` table needs a Supabase relationship to
`cabins` that Supabase can resolve for the `cabins(name, image)` select.

The application expects at least one row in `settings`, because it reads that
table as a single record. Booking status values currently used in the
application include `unconfirmed`, `checked-in`, and `checked-out`.

Cabin photos are rendered from remote Supabase Storage URLs. The default Next.js
image configuration in `next.config.ts` allows the project's currently
configured Supabase image host, as well as Google profile images and country
flag images. If you use a different Supabase project, update the Supabase
hostname in `next.config.ts` to match its public image URLs. Ensure cabin images
are accessible to the application at the URLs stored in `cabins.image`.

Country choices are loaded from the local
[`app/_lib/countries.json`](app/_lib/countries.json) file; they do not require a
separate country API at runtime.

## Google OAuth setup

Create a Google OAuth client and configure the following authorized redirect
URI:

```text
http://localhost:3000/api/auth/callback/google
```

For a deployed site, add the corresponding production URI:

```text
https://<your-domain>/api/auth/callback/google
```

Set the resulting client ID and secret as `AUTH_GOOGLE_ID` and
`AUTH_GOOGLE_SECRET`. The login page uses Google sign-in. On successful sign-in,
the Auth.js callback looks up the guest by email and creates a guest record if
one does not already exist.

## Routes

| Route | Description |
| --- | --- |
| `/` | Landing page with a link to explore cabins |
| `/about` | Lodge information |
| `/cabins` | Cabin catalogue with capacity filters |
| `/cabins/[cabinId]` | Cabin details, availability calendar, and reservation form |
| `/cabins/thankyou` | Confirmation page after reservation submission |
| `/login` | Google sign-in page |
| `/account` | Guest-area landing page; requires authentication |
| `/account/profile` | View and update guest profile; requires authentication |
| `/account/reservations` | List the signed-in guest's reservations |
| `/account/reservations/edit/[reservationId]` | Edit a reservation owned by the guest |
| `/api/auth/[...nextauth]` | Auth.js route handlers |

The account routes are guarded by `proxy.ts`, whose matcher covers
`/account/:path*`. The account layout provides the guest-area navigation.

On the cabin catalogue, the `capacity` query parameter selects a filter:
`all`, `small` (up to 3 guests), `medium` (4–7 guests), or `large` (8 or more).
For example, `/cabins?capacity=medium`.

## Application structure

```text
app/
├── _components/       Shared UI components and booking/profile forms
├── _contexts/         Client-side reservation date-range state
├── _lib/
│   ├── actions.ts     Server actions for guest and booking mutations
│   ├── auth.ts        Auth.js configuration and callbacks
│   ├── data-service.ts Supabase reads and data transformations
│   ├── supabase.ts    Supabase client initialization
│   └── countries.json Country and flag data
├── _styles/           Global styles and color data
├── _types/            TypeScript data and session types
├── about/             About page
├── account/           Authenticated guest area
├── api/auth/          Auth.js route handler
├── cabins/            Catalogue, cabin detail, and confirmation pages
├── login/             Sign-in page
├── layout.tsx         Root layout, metadata, header, and reservation context
└── page.tsx           Landing page
public/                Static images and icons
proxy.ts               Protects account routes
next.config.ts         Next.js image host configuration
```

Most pages are server components. They load data through
`app/_lib/data-service.ts`; client components are used for interactive UI such
as the calendar, filters, and forms. Mutations are implemented as server
actions in `app/_lib/actions.ts`. The `@/` import alias maps to the repository
root.

## How the application works

### Authentication and guest profiles

`app/_lib/auth.ts` configures Auth.js with Google. On sign-in, it requires an
email, finds or creates a matching `guests` row, and adds that guest's ID to the
session. The account route proxy requires an authenticated session. Sign-in and
sign-out are exposed through server actions.

### Cabin discovery and booking

The catalogue reads cabins from Supabase and applies the capacity filter.
Selecting a cabin loads its details, booking settings, and unavailable dates.
The calendar disables past dates and dates that are already booked, and uses
`minBookingLength` and `maxBookingLength` from the `settings` row.

Signed-in guests can submit the reservation form. The form calculates cabin
price and optional breakfast cost, then the `createBooking` server action
associates the booking with the current guest, sets its initial status to
`unconfirmed`, and redirects to `/cabins/thankyou`.

### Managing reservations and profile

The reservations page loads records for the signed-in guest. Before an update
or deletion, the server action checks that the requested reservation belongs to
that guest. The profile form updates the guest's national ID, nationality, and
country flag. Successful updates revalidate the relevant account pages.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build (run `pnpm build` first) |
| `pnpm lint` | Run ESLint |

There is currently no test script defined in `package.json`.

## Deployment

Deploy to a platform that supports Next.js, such as Vercel or a Node.js
environment. Configure all required environment variables in the deployment
environment, including production and preview environments where applicable.

Before launch:

1. Confirm the Supabase tables, settings row, relationships, and image URLs
   satisfy the data contract above.
2. Set the deployed domain's Google callback URI to
   `https://<your-domain>/api/auth/callback/google`.
3. Check that the production Supabase key is stored as a server-side secret and
   is not exposed to client bundles.
4. Update `next.config.ts` if your cabin image hostname differs from the
   currently configured project.
5. Run `pnpm build` and `pnpm lint`.

## Troubleshooting

### Supabase data does not load

- Check that `SUPABASE_URL` and `SUPABASE_SECRET_KEY` are present and refer to
  the intended project.
- Check that the tables and field names match the data contract. Field names
  such as `maxCapacity`, `regularPrice`, and `guestId` are case-sensitive in
  application queries.
- Ensure `settings` contains a row and the bookings-to-cabins relationship is
  available to Supabase's relational select.
- Check server logs for Supabase errors.

### Cabin images fail to render

- Check that each `cabins.image` URL is reachable.
- Confirm that the image host is allowed by `images.remotePatterns` in
  `next.config.ts`.
- For images stored in Supabase Storage, confirm the expected bucket and
  public URL are configured for your project.

### Google sign-in fails

- Verify `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, and `AUTH_SECRET`.
- Confirm the OAuth redirect URI exactly matches the current host and
  `/api/auth/callback/google` path.
- Ensure the Google account provides an email and that the corresponding guest
  record can be created in Supabase.

### Reservation actions fail

- Confirm the user is signed in and has a guest record.
- Check that the booking IDs and ownership fields (`guestId`, `cabinId`) in
  Supabase are correct.
- Check server logs for database errors and make sure the required form data
  and settings are present.

## Limitations and project status

This is an educational, demo-quality project. Its database schema is represented
by the TypeScript types and queries in the source rather than versioned SQL
migrations. Booking form checks are primarily implemented in the UI and server
actions; review and add server-side validation, database constraints, and
Supabase row-level security policies appropriate for your production
requirements before using real customer or payment data. No payment processing
is implemented.

## License

No license file is currently included. Add a license before redistributing or
publishing the project if you need to specify reuse terms.
