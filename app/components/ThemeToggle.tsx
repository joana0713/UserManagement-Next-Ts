"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="flex items-center gap-3">

      {/* Sun Icon */}
      <Sun
        size={18}
        strokeWidth={1.8}
        className={`transition-colors duration-300
          ${dark ? "text-gray-400" : "text-black dark:text-white"}`}
      />

      {/* Switch */}
      <button
        onClick={() => setDark(!dark)}
        className="
          relative w-14 h-7
          bg-gray-200 dark:bg-gray-800
          border border-gray-300 dark:border-gray-700
          rounded-full
          transition-colors duration-300
        "
      >
        <span
          className={`
            absolute top-1 left-1
            w-5 h-5
            bg-white dark:bg-black
            border border-gray-300 dark:border-gray-600
            rounded-full
            shadow-sm
            transform transition-transform duration-300
            ${dark ? "translate-x-7" : "translate-x-0"}
          `}
        />
      </button>

      {/* Moon Icon */}
      <Moon
        size={18}
        strokeWidth={1.8}
        className={`transition-colors duration-300
          ${dark ? "text-white" : "text-gray-400"}`}
      />
    </div>
  );
}