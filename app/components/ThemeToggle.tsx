"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex items-center gap-3">

      {/* Sun Icon */}
      <span
        className={`text-lg transition ${
          dark ? "text-gray-500" : "text-yellow-500"
        }`}
      >
        ☀️
      </span>

      {/* Switch */}
      <button
        onClick={() => setDark(!dark)}
        className="relative w-14 h-7 flex items-center
                   bg-gray-300 dark:bg-gray-700
                   rounded-full p-1 transition-colors duration-300"
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md
                      transform transition-transform duration-300
                      ${dark ? "translate-x-7" : "translate-x-0"}`}
        />
      </button>

      {/* Moon Icon */}
      <span
        className={`text-lg transition ${
          dark ? "text-blue-400" : "text-gray-400"
        }`}
      >
        🌙
      </span>
    </div>
  );
}