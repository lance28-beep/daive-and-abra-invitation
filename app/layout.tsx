import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter, Crimson_Text, Ephesis } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const crimsonText = Crimson_Text({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson" 
})
const ephesis = Ephesis({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-ephesis" 
})
const chicanos = localFont({
  src: "../chicanos-font/ChicanosPersonalUseRegular-qZDw5.ttf",
  variable: "--font-chicanos",
  display: "swap",
})
const helloParis = localFont({
  src: "../Hello Paris-Font/Hello Paris-Font/Hello Paris Sans Bold.ttf",
  variable: "--font-hello-paris",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Daive & Abra - Wedding Invitation",
  description:
    "You're invited to the wedding of Daive & Abra! Join us on June 19, 2026 in Paoay, Ilocos Norte, Philippines. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Daive & Abra wedding, Filipino wedding, RSVP, wedding gallery, wedding invitation, 2026 weddings, love story, Paoay Ilocos Norte, St. Augustine Parish Church, Crescencia The Events Place, #AbracaDaiveEra #ABRAsavedDAIVEstForLast #AbrafoundDaivest",
  authors: [
    { name: "Daive" },
    { name: "Abra" },
  ],
  creator: "Daive & Abra",
  publisher: "Daive & Abra",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://daive-and-abra-invitation.vercel.app/"),
  alternates: {
    canonical: "https://daive-and-abra-invitation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Daive & Abra Wedding | June 19, 2026",
    description:
      "Celebrate the union of Daive & Abra on June 19, 2026 in Paoay, Ilocos Norte, Philippines. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://daive-and-abra-invitation.vercel.app/",
    siteName: "Daive and Abra Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://daive-and-abra-invitation.vercel.app/Details/LinkPreview.jpg",
        width: 1200,
        height: 630,
        alt: "Daive & Abra Wedding Invitation - June 19, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daive & Abra Wedding Invitation",
    description:
      "You're invited to the wedding of Daive & Abra! June 19, 2026. RSVP, view our gallery, and leave a message! #AbracaDaiveEra",
    images: ["https://daive-and-abra-invitation.vercel.app/Details/LinkPreview.jpg"],
    creator: "@daiveandabra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Daive & Abra Wedding",
      startDate: "2026-06-19T15:00:00+08:00",
      endDate: "2026-06-19T21:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "St. Augustine Parish Church, Paoay, Ilocos Norte",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Paoay",
            addressRegion: "Ilocos Norte",
            addressCountry: "PH",
          },
        },
        {
          "@type": "Place",
          name: "Crescencia The Events Place, Paoay, Ilocos Norte",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Young Street",
            addressLocality: "Paoay",
            addressRegion: "Ilocos Norte",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://daive-and-abra-invitation.vercel.app/Details/LinkPreview.jpg"],
      description:
        "You're invited to the wedding of Daive & Abra! June 19, 2026 in Paoay, Ilocos Norte, Philippines. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Daive & Abra",
      },
      offers: {
        "@type": "Offer",
        url: "https://daive-and-abra-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#AbracaDaiveEra",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#C45508" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} ${crimsonText.variable} ${ephesis.variable} ${chicanos.variable} ${helloParis.variable} font-inter antialiased text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
