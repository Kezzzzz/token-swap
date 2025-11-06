import TokenSwapInterface from "@/components/TokenSwapInterface";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Subtle noise texture for depth */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      
      <main className="relative container mx-auto px-4 py-12">
        <TokenSwapInterface />
      </main>

      {/* Subtle attribution */}
      <div 
        className="fixed bottom-4 right-4 text-xs text-gray-700 opacity-50 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200"
        role="contentinfo"
        aria-label="Powered by Funkit API"
      >
        Powered by <span className="text-white">Funkit API</span>
      </div>
    </div>
  );
}
