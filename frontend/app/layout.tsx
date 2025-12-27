import type { Metadata } from "next";
import "./globals.css";
import RootLayout from "@/src/layout/RootLayout";
import ReactQueryProvider from "@/src/provider/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Workspace Management",
  description: "Manage your projects efficiently",
};

export default function RootLayoutApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReactQueryProvider>
          <RootLayout>{children}</RootLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
