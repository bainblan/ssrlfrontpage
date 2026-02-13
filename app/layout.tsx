import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UGA Small Satellite Research Laboratory",
  description: "The Small Satellite Research Laboratory at the University of Georgia",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
