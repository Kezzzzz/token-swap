# Token Price Explorer

A modern, intuitive interface for exploring cryptocurrency token prices and comparing values. Built with Next.js, TypeScript, Tailwind CSS, and TanStack Query.

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TanStack Query](https://tanstack.com/query)** - Powerful data fetching and state management
- **[@funkit/api-base](https://www.npmjs.com/package/@funkit/api-base)** - Real-time token prices
- **[CoinGecko API](https://www.coingecko.com/api)** - Historical price data & sparklines

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (comes with Node.js) or your preferred package manager

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Funkit API Key (Optional)

The application comes with a working API key. To use your own, create a `.env.local` file:

```bash
FUNKIT_API_KEY=your_api_key_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Token Price Explorer in action!

## Project Structure

```
token-swap/
├── src/
│   ├── app/                           # App Router pages and layouts
│   │   ├── api/                       # API Routes (server-side)
│   │   │   ├── sparkline/[coingeckoId]/
│   │   │   │   └── route.ts           # CoinGecko historical data
│   │   │   └── token/[chainId]/[symbol]/
│   │   │       └── route.ts           # Funkit API proxy
│   │   ├── layout.tsx                 # Root layout with providers
│   │   ├── page.tsx                   # Home page with token prices
│   │   └── globals.css                # Global styles
│   ├── components/                    # Reusable React components
│   │   ├── TokenSwapInterface.tsx     # Main swap interface component
│   │   ├── TokenDropdown.tsx          # Searchable token selection dropdown
│   │   ├── TokenListItem.tsx          # Token list item with sparkline
│   │   ├── Sparkline.tsx              # Custom SVG sparkline chart
│   │   └── TokenPanel.tsx             # Token display and conversion panel
│   ├── hooks/                         # Custom React hooks
│   │   └── useTokenPrice.ts           # Custom hook for fetching token prices
│   ├── lib/                           # Library code and utilities
│   │   ├── constants/
│   │   │   └── tokens.ts              # Supported tokens configuration
│   │   └── funkit/
│   │       └── client.ts              # Funkit API configuration
│   └── providers/                     # React context providers
│       └── QueryProvider.tsx          # TanStack Query configuration
├── public/                            # Static assets
└── ...config files
```

## Features

### 🎨 Modern, Intuitive UI
- Clean, minimal design inspired by leading crypto platforms (Coinbase, Uniswap, Matcha)
- Smooth transitions and hover effects
- Responsive layout that works beautifully on all devices
- Dark mode support

### 💱 Real-Time Price Conversion
- **Searchable dropdowns** for intuitive token selection
- **40+ tokens** across 5 major chains (Ethereum, Polygon, Base, Arbitrum, Optimism)
- **Featured section** highlighting the 4 most popular tokens
- **Mini sparklines** showing 7-day price trends for each token
- **24h price change %** with color coding (green/red)
- **Search by symbol, name, or chain** for quick access
- Enter USD amount and see instant conversions
- Live price updates every 60 seconds
- Swap tokens with a single click

### ⚡ Performance & UX
- Skeleton loading states (no jarring flashes)
- Optimistic UI updates
- Smart caching with TanStack Query
- Error handling with clear feedback
- Focus and hover states for accessibility

### Funkit API Integration

The application integrates with the Funkit API to fetch real-time cryptocurrency prices using Next.js API routes.

**Featured Tokens:**
- **USDC** on Ethereum (Chain ID: 1)
- **USDT** on Polygon (Chain ID: 137)
- **ETH** on Base (Chain ID: 8453)
- **WBTC** on Ethereum (Chain ID: 1)

**All Supported Tokens:**
- **40+ tokens** across major DeFi protocols
- **5 chains**: Ethereum, Polygon, Base, Arbitrum, Optimism
- Popular DeFi tokens: DAI, LINK, UNI, AAVE, MKR, SNX, CRV, LDO
- Chain-native tokens: WMATIC, ARB, OP, cbETH
- Wrapped assets: WETH, WBTC

**Custom Hook: `useTokenPrice`**

The `useTokenPrice` hook provides a clean interface for fetching token price data:

```typescript
import { useTokenPrice } from "@/hooks/useTokenPrice";

function MyComponent() {
  const { data, isLoading, error } = useTokenPrice({
    symbol: "USDC",
    chainId: 1,
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Price: ${data.price}</p>}
    </div>
  );
}
```

**Features:**
- Automatic price refresh every 60 seconds
- Built-in error handling and retry logic
- TypeScript type safety
- Caching and stale-time management via TanStack Query

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn TypeScript
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn Tailwind CSS
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview) - Learn TanStack Query

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).
