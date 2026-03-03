"use client";

import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-800
                         flex items-center justify-between px-8
                         bg-white dark:bg-gray-900">
        <h1 className="text-lg font-semibold tracking-tight">
          User Management
        </h1>

        <ThemeToggle />
      </header>

      {/* Main */}
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white dark:bg-gray-900
                          border border-gray-200 dark:border-gray-800
                          rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Users
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              Data table coming next step.
            </p>

          </div>

        </div>
      </main>
    </div>
  );
}