import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { NextRequest, NextResponse } from "next/server";

const FUNKIT_API_KEY =
  process.env.FUNKIT_API_KEY ||
  process.env.NEXT_PUBLIC_FUNKIT_API_KEY ||
  "SOME_RANDOM_API_KEY";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chainId: string; symbol: string }> }
) {
  try {
    // In Next.js 16, params is a Promise and must be awaited
    const { chainId, symbol } = await params;

    // Step 1: Get asset ERC20 information
    const assetInfo = await getAssetErc20ByChainAndSymbol({
      chainId,
      symbol,
      apiKey: FUNKIT_API_KEY,
    });

    if (!assetInfo || !assetInfo.address) {
      return NextResponse.json(
        { error: `Asset not found for ${symbol} on chain ${chainId}` },
        { status: 404 }
      );
    }

    // Step 2: Get price information
    const priceInfo = await getAssetPriceInfo({
      chainId,
      assetTokenAddress: assetInfo.address,
      apiKey: FUNKIT_API_KEY,
    });

    return NextResponse.json({
      symbol,
      chainId: parseInt(chainId),
      address: assetInfo.address,
      price: priceInfo?.unitPrice,
      priceInfo,
      assetInfo,
    });
  } catch (error: unknown) {
    const errorObj = error as { status?: number; statusCode?: number };
    if (errorObj.status === 403 || errorObj.statusCode === 403) {
      return NextResponse.json(
        { error: "API authentication failed" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch token data" },
      { status: 500 }
    );
  }
}
