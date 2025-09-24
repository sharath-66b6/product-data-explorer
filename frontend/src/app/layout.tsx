import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Data Explorer",
  description: "Product explorer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        {/* Client-only init lives in its own file */}
        <script id="client-init-placeholder" />
      </body>
    </html>
  );
}
