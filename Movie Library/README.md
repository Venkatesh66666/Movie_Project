# AuraCinemaX (ACX)

A modern movie discovery platform with streaming-style UI, rich movie details, trailers, watchlist, favorites, and user reviews.

## Live Website

- https://auracinemax-acx.netlify.app

## Repository

- https://github.com/Venkatesh66666/Movie_Project

## Main Features

- Trending, upcoming, now playing, and language-based movie browsing
- Search movies with fast API caching
- Movie details with trailer support and poster fallbacks
- Add/Remove favorites and watchlist from multiple pages
- Write reviews with thank-you confirmation
- Separate review sections:
- `Your Reviews`
- `Existing Reviews (TMDB + Audience Pulse)`
- Responsive design for desktop/tablet/mobile
- PWA-ready structure and service worker registration
- Analytics support (owner-only via GA4)

## Tech Stack

- React 18
- React Router 6
- React Query
- MUI
- TMDB API
- Netlify

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (use `.env.example`):
```env
REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. Run in development:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Scripts

- `npm start` - Start dev server
- `npm run build` - Production build
- `npm test` - Run tests

## Deployment (Netlify)

This project is already configured for Netlify:

- `netlify.toml`
- `public/_redirects`

Deploy flow:

1. Push changes to GitHub
2. Connect repo in Netlify
3. Add environment variables in Netlify
4. Deploy

## Analytics (Private Dashboard)

GA4 tracking is enabled only when:

- `REACT_APP_GA_MEASUREMENT_ID` is set
- app is running in production mode

Visitor analytics are visible only in your Google Analytics account.
