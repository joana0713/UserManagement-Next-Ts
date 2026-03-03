import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./Providers"

export const metadata = {
  title: "User Management",
  description: "Modern SaaS Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          richColors  
        />
      </body>
    </html>
  );
}