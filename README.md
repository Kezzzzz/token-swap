# Token Price Explorer

A modern, intuitive interface for exploring cryptocurrency token prices and comparing values. Built with Next.js, TypeScript, Tailwind CSS, and TanStack Query.

🚀 **Live Demo:** [https://token-swap-psi.vercel.app](https://token-swap-psi.vercel.app)

## Performance Metrics

Lighthouse scores for the production deployment:

| Category              | Score       | Status         |
| --------------------- | ----------- | -------------- |
| 🚀 **Performance**    | **99/100**  | 🟢 Exceptional |
| ♿ **Accessibility**  | **95/100**  | 🟢 Excellent   |
| ✅ **Best Practices** | **100/100** | 🟢 Perfect     |
| 🔍 **SEO**            | **60/100**  | 🟡 Good        |

**Highlights:**

- **Near-perfect performance (99)** - Fast loading, minimal blocking time, optimized assets
- **Excellent accessibility (95)** - Keyboard navigation, ARIA labels, focus management, proper contrast
- **Perfect best practices (100)** - HTTPS, no console errors, modern web standards, secure APIs
- **Good SEO (60)** - Room for improvement with structured data and enhanced meta tags

**What makes this fast:**

- Next.js App Router with optimized bundle splitting
- TanStack Query with intelligent caching and stale-while-revalidate
- Tailwind CSS v4 with minimal CSS footprint
- Server-side API routes to avoid CORS and secure API keys
- Efficient React component design with minimal re-renders

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TanStack Query v5](https://tanstack.com/query)** - Powerful data fetching and state management
- **[Motion](https://motion.dev/)** - Lightweight animation library (formerly Framer Motion)
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

**Key Dependencies:**

- `motion` - For smooth sparkline animations (path morphing, color transitions)
- `@tanstack/react-query` - Data fetching and caching
- `@funkit/api-base` - Crypto token price API

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

- Skeleton loading states
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

## Product & UX Decisions

This section documents the key product and UX decisions made during development, inspired by industry-leading crypto platforms.

### Why Vertical Layout?

**Decision:** Single-column vertical card layout (similar to Uniswap, Matcha, 1inch)

**Reasoning:**

- **Mobile-first approach** - Works perfectly on all screen sizes without complex responsive logic
- **Natural reading flow** - Top-to-bottom matches user mental model (input → action → output)
- **No alignment issues** - Everything stacks naturally without side-by-side complexity
- **Proven pattern** - Users are already familiar with this from every major DEX

**Alternatives Considered:**

- Side-by-side panels: Created alignment issues, complex on mobile
- Multi-step wizard: Too many clicks, poor for quick comparisons

### Why Searchable Dropdowns?

**Decision:** Searchable dropdown selectors instead of button grids

**Reasoning:**

- **Scalability** - Supports 40+ tokens without UI clutter
- **Speed** - Users can type to filter instead of scanning 40 buttons
- **Keyboard-first** - Full arrow key navigation + Enter to select (power user friendly)
- **Industry standard** - Matches Coinbase, Uniswap, Binance patterns

**UX Enhancements Added:**

- Auto-focus on search input when dropdown opens
- Smart positioning (opens upward if no space below)
- "Popular" badges for most-used tokens
- Mouse + keyboard hybrid navigation

### Why Sparklines in Selected Token View?

**Decision:** Show sparkline in the dropdown trigger (selected token), not in the dropdown list

**Reasoning:**

- **API efficiency** - Only 2 API calls max instead of 40+ (respects rate limits)
- **Progressive disclosure** - Show rich data where it matters (selected tokens)
- **Performance** - Dropdowns open instantly, no waiting for charts
- **Visual hierarchy** - Sparkline tightly coupled with your chosen token

**Pattern Inspiration:**

- Robinhood: List shows %, detail view shows full chart
- Coinbase: Summary in lists, details on asset pages

### Why Auto-Focus on Amount Input?

**Decision:** After selecting "You pay" token, cursor jumps to amount input and selects the value

**Reasoning:**

- **Reduces friction** - One less click in the workflow
- **Matches user intent** - After picking a token, next step is always entering amount
- **Proven pattern** - Coinbase, Robinhood do this in their flows
- **Efficiency** - Text is pre-selected for easy replacement

### Why Space Grotesk Font?

**Decision:** Use Space Grotesk instead of default system fonts

**Reasoning:**

- **Crypto identity** - Used by many DeFi protocols and Web3 apps
- **Modern aesthetic** - Geometric, technical feel matches the domain
- **Readability** - Excellent for numbers and data-heavy interfaces
- **Brand consistency** - Creates a cohesive, professional impression

### Why Dark Theme?

**Decision:** Dark mode by default with purple/blue accents

**Reasoning:**

- **Crypto industry standard** - Most exchanges use dark themes (reduces eye strain during long sessions)
- **Premium feel** - Dark backgrounds with colored accents feel more sophisticated
- **Data focus** - Dark backgrounds make colorful data (green/red changes) pop
- **User preference** - Crypto traders overwhelmingly prefer dark mode

### Why Minimalist Design Approach?

**Decision:** Tight spacing, clean typography, no decorative elements

**Reasoning:**

- **Information density** - Compact dropdowns show more tokens without scrolling
- **Professional aesthetic** - Clean, uncluttered interfaces feel more trustworthy
- **Speed to information** - Users can scan tokens faster without visual noise
- **Modern trend** - Leading fintech apps (Stripe, Coinbase, Wise) embrace minimalism

**Design Principles Applied:**

- Single headline, no subtitle (self-explanatory interface)
- Token sorting instead of badges (popular tokens appear first naturally)
- Tight 12px padding in dropdowns (maximizes visible options)
- Implied labels (sparkline implies "7-day trend")
- Medium font weights (reduces visual heaviness)

### Why Animated Sparklines?

**Decision:** Use Motion library for smooth sparkline morphing instead of instant updates

**Reasoning:**

- **Visual continuity** - Morphing paths feel natural, flashing is jarring
- **Professional polish** - Animations signal quality and attention to detail
- **Data storytelling** - Transitions help users track how trends change
- **Modern expectation** - Users expect smooth UI in 2024

**Implementation:**

- 0.8s path morphing with cubic-bezier easing
- Color transitions (green ↔ red) over 0.5s
- No fade in/out - pure shape transformation
- Lightweight (~10KB) vs heavy charting libraries (100KB+)

**Trade-off:** Slight complexity vs instant updates, but worth it for polish

### Why Mouse-Tracking Border Glow?

**Decision:** Interactive 2px purple glow that follows cursor around card border

**Reasoning:**

- **Premium feel** - Interactive micro-animations signal high-quality product
- **Visual feedback** - Subtle acknowledgment of user presence
- **Modern pattern** - Popular in Web3/crypto interfaces (e.g., Rainbow, Phantom)
- **Non-intrusive** - Only visible on hover, doesn't distract

**Implementation:**

- Radial gradient (300px radius) at cursor position
- 2px border wrapper with CSS custom properties
- Smooth 500ms fade-in on hover
- Zero performance impact (CSS-only)

### Why Custom Scrollbars?

**Decision:** Purple-themed minimal scrollbars across all browsers/platforms

**Reasoning:**

- **Brand consistency** - Matches purple accent color throughout UI
- **Cross-platform uniformity** - Same experience on Windows/Mac/Linux
- **Aesthetic** - Default white scrollbars clash with dark theme
- **Professional touch** - Details matter in high-quality products

**Implementation:**

- 8px width (thin, minimal)
- Purple thumb with opacity transitions
- Works in Firefox (scrollbar-color) and Webkit (pseudo-elements)

### Why Token Avatar Fallbacks?

**Decision:** Multi-tier image loading with graceful fallback to gradient letter avatars

**Reasoning:**

- **Reliability** - External CDNs can be slow or fail; fallbacks ensure UI never breaks
- **Performance** - CoinGecko URLs are cached globally for fast loading
- **Graceful degradation** - Letter avatars look intentional and consistent, not like broken images
- **User trust** - Visual consistency across all tokens builds confidence

**Implementation:**

- **Primary:** CoinGecko asset URLs (reliable for top 100 tokens, globally cached)
- **Secondary:** CryptoCurrency Icons CDN (covers 200+ tokens)
- **Fallback:** Purple/blue gradient circles with first 2 letters (matches theme)
- **Smart reset:** Avatar state resets when token changes to prevent stale images

## Technical Trade-offs

### CoinGecko API for Historical Data

**Decision:** Use CoinGecko's free API for 7-day sparklines

**Why:**

- Free tier includes historical price data
- 50 calls/minute is sufficient for our use case
- Widely used and reliable
- No additional authentication needed

**Trade-offs:**

- External dependency (but well-maintained)
- Rate limits (mitigated with 1-hour caching)
- Limited to what CoinGecko supports

**Alternative Considered:**

- Building our own: Would require database, cron jobs, complexity far exceeds scope
- Paid APIs: Unnecessary for this use case

### Custom SVG Sparklines with Motion

**Decision:** Build custom SVG sparkline component with Motion animations

**Why:**

- **Bundle size** - ~12KB (2KB SVG + 10KB Motion) vs 100KB+ for Chart.js or Recharts
- **Performance** - Lightweight, GPU-accelerated animations
- **Full control** - Exact styling and animation timing
- **Simplicity** - We only need simple line charts with morphing

**Trade-offs:**

- Less features (no tooltips, zoom, etc.)
- Manual SVG path calculations
- Additional Motion dependency
- But: Perfect for our needs with beautiful animations

**Why Motion over CSS Transitions:**

- CSS can't smoothly morph SVG paths (just opacity/transform)
- Motion handles complex path interpolation automatically
- Better easing curves and timing control
- Only 10KB - acceptable for the polish it provides

### Server-Side API Routes

**Decision:** Proxy all Funkit API calls through Next.js API routes

**Why:**

- **CORS solution** - Funkit API doesn't allow direct browser calls
- **Security** - API keys stay server-side, never exposed to browser
- **Flexibility** - Can add rate limiting, caching, logging
- **Production-ready** - Proper architecture for deployment

**Trade-offs:**

- Slightly higher latency (~50-100ms) vs direct calls
- More code to maintain
- But: Necessary for security and CORS compliance

### TanStack Query Caching Strategy

**Decision:** Different stale times for different data types

**Implementation:**

- Token prices: 30s stale, 60s refetch (prices change frequently)
- Sparklines: 1hr stale (historical data rarely changes)

**Why:**

- Balances freshness with API efficiency
- Reduces unnecessary network calls
- Improves perceived performance

### Featured vs All Tokens

**Decision:** 4 featured tokens with "Popular" badge, then 36+ additional tokens

**Why:**

- **Discoverability** - Most users will use USDC, USDT, ETH, WBTC
- **Scalability** - Can support hundreds of tokens without overwhelming new users
- **Visual clarity** - Badges help users quickly find what they need

**Sort Strategy:**

- Featured tokens always float to top of search results
- Provides best of both: curation + comprehensive options

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Deployment

This application is deployed on Vercel: [https://token-swap-c9ped676v-team-kezizzle.vercel.app](https://token-swap-c9ped676v-team-kezizzle.vercel.app)

### Deploy Your Own

1. **Fork this repository** on GitHub

2. **Import to Vercel:**

   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your forked repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variable:**

   - Go to Project Settings → Environment Variables
   - Add: `FUNKIT_API_KEY` with your Funkit API key
   - Apply to: Production, Preview, Development

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

### Using Vercel CLI

```bash
npm install -g vercel
vercel
# Follow prompts to deploy
```

For more details, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is open source and available under the [MIT License](LICENSE).
