import TokenSwapInterface from "@/components/TokenSwapInterface";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0b0d] via-[#0f0f14] to-[#14151a]">
      {/* Gradient overlay for depth */}
      <div className="fixed inset-0 bg-linear-to-tr from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
      
      <main className="relative container mx-auto px-4 py-12">
        <TokenSwapInterface />
      </main>

      {/* Subtle attribution */}
      <div className="fixed bottom-4 right-4 text-xs text-gray-600 opacity-50 hover:opacity-100 transition-opacity duration-200">
        Powered by <span className="text-purple-400">Funkit API</span>
      </div>
    </div>
  );
}
