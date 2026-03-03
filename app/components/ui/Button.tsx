"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "soft";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center",
        "px-4 py-2 rounded-xl text-sm font-medium",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          // Primary
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
            variant === "primary",

          // Secondary
          "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800":
            variant === "secondary",

          // Danger
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
            variant === "danger",

          // Ghost
          "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800":
            variant === "ghost",

            // Soft 
            "bg-blue-600/10 text-blue-600 border border-blue-600/20 hover:bg-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-400/20 dark:hover:bg-blue-500/20":
            variant === "soft",
        },
        className
      )}
      {...props}
    />
  );
}