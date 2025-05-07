import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/Redux/provider";
import { ThemeProvider } from "next-themes";
import DarkModeToggle from "@/components/darkMood/DarkMoodToggle";
import Providers from "@/providers/Providers";

// Font setup
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "TutorLink",
  description: "Providing a platform for tutors and students to connect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
        className={`font-sans antialiased transition-colors duration-300 dark:bg-gray-900`}
      >
        <Toaster position="top-right" />
        <Providers>
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
              <DarkModeToggle />
            </ThemeProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
