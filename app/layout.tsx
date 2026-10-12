import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter_Tight } from "next/font/google";
import { Toaster } from "@ieee/ui/components/sonner";
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
    "Join IEEE SRMIST. Ten domains: pick up to three and find your place in the student branch.",
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
        <Toaster theme="light" position="bottom-center" />
      </body>
    </html>
  );
}
