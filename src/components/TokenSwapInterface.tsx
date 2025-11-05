import SwapCard from "./SwapCard";

export default function TokenSwapInterface() {
  return (
    <div className="mx-auto w-full max-w-lg space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="bg-linear-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
          Token Price Explorer
        </h1>
      </div>

      <SwapCard />
    </div>
  );
}

