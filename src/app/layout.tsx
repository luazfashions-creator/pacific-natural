import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pacific Naturals | Science-Backed Longevity",
  description:
    "Premium, science-backed longevity supplements and cosmetics. Bridging the gap between pure nature and clinical data for cellular rejuvenation and healthy aging.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Pacific Naturals | Science-Backed Longevity",
    description:
      "Premium, science-backed longevity supplements and cosmetics for healthy aging.",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pacific Naturals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacific Naturals | Science-Backed Longevity",
    description:
      "Premium, science-backed longevity supplements and cosmetics for healthy aging.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-text-primary font-body antialiased">
        <NextTopLoader color="#5A675B" showSpinner={false} height={3} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
