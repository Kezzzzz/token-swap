import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ coingeckoId: string }> }
) {
  try {
    const { coingeckoId } = await params;

    // Fetch 7-day price history from CoinGecko (free tier)
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=7&interval=daily`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Extract prices for sparkline (array of [timestamp, price])
    const prices = data.prices.map((item: [number, number]) => item[1]);

    // Calculate 24h change
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const priceChange = lastPrice - firstPrice;
    const priceChangePercent = ((priceChange / firstPrice) * 100).toFixed(2);

    return NextResponse.json({
      coingeckoId,
      prices,
      priceChange,
      priceChangePercent: parseFloat(priceChangePercent),
      isPositive: priceChange >= 0,
    });
  } catch (error: any) {
    console.error("[Sparkline API] Error fetching data:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch sparkline data" },
      { status: 500 }
    );
  }
}

