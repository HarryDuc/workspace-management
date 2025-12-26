import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/src/provider/react-query-provider";

export const metadata: Metadata = {
  title: "Workspace Management",
  description: "Manage your projects efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
