import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TutorConnect — Find Your Perfect Tutor",
  description:
    "India's premier online tutoring marketplace. AI-powered teacher matching, automated scheduling, and personalized learning. Find expert tutors for CBSE, ICSE, and more.",
  keywords: [
    "online tutoring",
    "private tutor",
    "CBSE tutor",
    "ICSE tutor",
    "math tutor",
    "physics tutor",
    "home tuition",
    "online classes",
    "personalized learning",
  ],
  openGraph: {
    title: "TutorConnect — Find Your Perfect Tutor",
    description:
      "AI-powered tutoring marketplace with automated scheduling, smart teacher matching, and personalized study plans.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
