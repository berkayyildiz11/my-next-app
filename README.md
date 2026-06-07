# FinSense

FinSense is a Next.js application for real-time US stock visualization, market news, and AI-assisted stock prediction. It combines live quote data, charting, paginated news, and FinSense model outputs with SHAP-style explanation details.

## Features

- Home page with popular stock cards backed by live quote values.
- US stocks table with search, sorting, and quote refresh behavior.
- Dynamic stock detail pages at `/us-stocks/[symbol]`.
- Recharts line and candlestick chart modes.
- FinSense prediction panel with period controls, confidence, explanation summary, feature contributions, and decision details.
- News page with backend-driven pagination using `page`, `limit`, `total`, `totalPages`, `refreshing`, and `data`.
- Static About and Contact pages with page metadata for browser tab titles.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- TanStack Table
- Radix UI
- Lucide icons

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `FINNHUB_API_KEY` | Yes | Server-side API key used by `/api/stock` for live quotes. |
| `NEXT_PUBLIC_API_URL` | Yes | Backend base URL used by charts, predictions, and news. |

Do not commit real API keys.

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Create production build
npm run start    # Start production server
npm run server   # Run websocket server entrypoint
```

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Home / main menu with hero and popular stock grid. |
| `/us-stocks` | Full US stocks list. |
| `/us-stocks/[symbol]` | Stock detail chart and FinSense prediction panel. |
| `/news` | Paginated market news feed. |
| `/about` | Project overview and disclaimer. |
| `/contact` | Contact page. |
| `/main-menu` | Redirects to `/`. |

## API Usage

This app uses one local Next.js API route and several backend API endpoints.

Local quote route:

```text
GET /api/stock?symbol=AAPL
```

Backend chart route:

```text
GET {NEXT_PUBLIC_API_URL}/api/stocks/AAPL/chart?period=1d
```

Backend prediction route:

```text
GET {NEXT_PUBLIC_API_URL}/api/predict/AAPL?period=1d&explain=true
```

Backend news route:

```text
GET {NEXT_PUBLIC_API_URL}/api/news?page=1&limit=10
```

## Notes

- The stock detail page keeps the chart and prediction panel as separate components so their loading states do not control each other.
- The news page uses `totalPages` from the backend response rather than calculating pages from `data.length`.
- Page metadata is exported from server route components. Hook-based UI is placed in client components where needed.
