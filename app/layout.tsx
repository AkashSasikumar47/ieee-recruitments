import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter_Tight } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Recruitments | IEEE SRMIST",
  description:
    "Recruitment at IEEE SRMIST is closed for now, but the waitlist is open. Ten domains: pick up to three and find your place in the student branch.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f6fa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.className} ${interTight.variable} ${bebasNeue.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
