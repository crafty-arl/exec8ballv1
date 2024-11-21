import Magic8Ball from "@/components/magic-8-ball"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-sm">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-center">Executive Decision Maker</h1>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Magic8Ball />
      </main>

      <footer className="w-full p-4 sm:p-6 bg-white dark:bg-gray-900 text-center">
        <p className="text-sm sm:text-base">Make better decisions, one shake at a time.</p>
      </footer>
    </div>
  );
}
