import SwapCard from "./SwapCard";

export default function TokenSwapInterface() {
  return (
    <div className="mx-auto w-full max-w-lg space-y-8">
      {/* Header with Liquid Glass Effect */}
      <div className="text-center leading-[0.9]">
        <h1 className="text-6xl font-bold tracking-tight">
          <div
            className="text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, white 0%, white 15%, transparent 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            Token Price
          </div>
          <div
            className="text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, white 0%, white 10%, black 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            Explorer
          </div>
        </h1>
      </div>

      <SwapCard />
    </div>
  );
}
