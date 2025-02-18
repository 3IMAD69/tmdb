# MovieFlix

A modern movie browsing application built with Next.js, leveraging The Movie Database (TMDB) API.

## Features

- **Search Movies**: Real-time search functionality with debouncing ussing react server component using nuqs package
- **Movie Details**: View detailed information about movies in a modal fetching using tanstack query with caching feature
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Dual Navigation Options**:
  - Traditional pagination (`/`)
  - Infinite scroll (`/infinity-scroll`)

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Tanstack Query
- Shadcn/ui
- TMDB API

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file and add your TMDB API key:
```
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```
4. Run the development server:
```bash
npm run dev
```

## License

MIT
