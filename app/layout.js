
// import { BarLoader } from "react-spinners";
// import { Suspense } from "react";

// export default function Layout({ children }) {
//   return (
//     <div className="px-5">
//       <div className="flex items-center justify-between mb-5">
//         <h1 className="text-6xl font-bold gradient gradient-title">Industry Insights</h1>
//       </div>
//       <Suspense
//         fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
//       >
//         {children}
//       </Suspense>
//     </div>
//   );
// }

import { Inter } from "next/font/google";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Linkedin } from "@/components/ui/linkedin";
import { Github } from "@/components/ui/github";


const inter = Inter({subsets :["latin"]})
export const metadata = {
  title: "GrovikAI",
  description: "AI Career Coach for Your Career",
};
export default async function RootLayout({ children }) {
  // ✅ Fetch session on the server
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${inter.className} `}>
        <Providers session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            
            <main className="min-h-screen">{children}</main>
            {/*  */}
            <Toaster richcolors/>
           
<footer className="bg-background py-2">
<div className="flex items-center justify-center gap-4 text-white">
    {/* Social Links */}
    {/* <a
      href="https://github.com/your-github-username"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400 "
    >
      <Github className="mr-2 h-4 w-4" />
    </a> */}
    <a
      href="https://www.linkedin.com/in/aditya-nath-/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-400 transition-colors"
    >
      <Linkedin className="w-6 h-6" />
    </a>
  </div>

  <div className="text-center text-white mt-4">
    <p>Made with 💗 by Aditya</p>
  </div>
</footer>

          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

/*
Meta Data 
export const metadata = {
  title: {
    default: "GrovikAI – AI Career Coach",
    template: "%s | GrovikAI", // page title will be `PageName | GrovikAI`
  },
  description:
    "GrovikAI is your AI-powered career coach – helping you prepare for interviews, upskill, and grow in your career.",
  keywords: [
    "AI Career Coach",
    "GrovikAI",
    "Interview Preparation",
    "Career Growth",
    "AI Learning Assistant",
  ],
  authors: [{ name: "Aditya Yadav", url: "https://www.linkedin.com/in/aditya-nath-/" }],
  creator: "Aditya Yadav",
  metadataBase: new URL("https://grovikai.vercel.app"), // change to your deployed URL
  openGraph: {
    title: "GrovikAI – AI Career Coach for Your Career",
    description:
      "AI-powered platform to guide you in your career journey with interview prep, insights, and personalized learning.",
    url: "https://grovikai.vercel.app",
    siteName: "GrovikAI",
    images: [
      {
        url: "https://grovikai.vercel.app/og-image.png", // Add OG preview image
        width: 1200,
        height: 630,
        alt: "GrovikAI – AI Career Coach",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrovikAI – AI Career Coach",
    description:
      "Your personal AI-powered coach for career growth and interview success.",
    creator: "@yourTwitterHandle", // replace if you have
    images: ["https://grovikai.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
*/