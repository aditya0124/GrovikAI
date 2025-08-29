
// "use client";

// import React from "react";
// import { Button } from "./ui/button";
// import {
//   PenBox,
//   LayoutDashboard,
//   FileText,
//   GraduationCap,
//   ChevronDown,
//   StarsIcon,
// } from "lucide-react";
// import Link from "next/link";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { SignOut } from "./sign-out";

// export default function Header() {
//   const { data: session, status } = useSession();
//   if (status === "loading") {
//     return (
//       <header className="p-4 bg-gray-800 text-white">
//         <p>Loading...</p>
//       </header>
//     );
//   }


//   const handleSignOut = async () => {
//     const res = await fetch("/api/auth/signout", { method: "POST" });
//     if (res.ok) {
//       window.location.href = "/";
//     }
//   };

//   const handleSignIn = async () => {
//     window.location.href = "/api/auth/signin";
//   };

//   return (
//     <header className=" fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
//       <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src={"/logo.png"}
//             alt="Sensai Logo"
//             width={200}
//             height={60}
//             className="h-12 py-1 w-auto object-contain"
//           />
//         </Link>

//         {/* Right side buttons */}
//         <div className="flex items-center space-x-2 md:space-x-4">
//           {status === "authenticated" ? (
//             <>
//               {/* Dashboard button */}
//               <Link href="/dashboard">
//                 <Button
//                   variant="outline"
//                   className="hidden md:inline-flex items-center gap-2"
//                 >
//                   <LayoutDashboard className="h-4 w-4" />
//                   Industry Insights
//                 </Button>
//                 <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
//                   <LayoutDashboard className="h-4 w-4" />
//                 </Button>
//               </Link>

//               {/* Growth Tools Dropdown */}
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button className="flex items-center gap-2">
//                     <StarsIcon className="h-4 w-4" />
//                     <span className="hidden md:block">Growth Tools</span>
//                     <ChevronDown className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-48">
//                   <DropdownMenuItem asChild>
//                     <Link href="/career" className="flex items-center gap-2">
//                       <GraduationCap className="h-4 w-4" />
//                       AI Career RoadMap
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href="/resume" className="flex items-center gap-2">
//                       <FileText className="h-4 w-4" />
//                       Build Resume
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link
//                       href="/ai-cover-letter"
//                       className="flex items-center gap-2"
//                     >
//                       <PenBox className="h-4 w-4" />
//                       Cover Letter
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href="/interview" className="flex items-center gap-2">
//                       <GraduationCap className="h-4 w-4" />
//                       Interview Prep
//                     </Link>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               {/* Sign Out Button (temporary) */}
//               {/* <Button
//                 variant="outline"
//                 className="ml-2"
//                 onClick={handleSignOut}
//               >
                
//               </Button> */}
//               <SignOut/>
//             </>
//           ) : (
//             // If not logged in → Sign In button
//             <Button variant="outline" onClick={handleSignIn}>
//               Sign In
//             </Button>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  PenBox,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { data: session, status } = useSession();

  // 🚫 don’t render a “loading” placeholder → let SSR markup match immediately
  if (!session) {
    return (
      <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/newLogo.png"
              alt="Sensai Logo"
              width={200}
              height={100}
              className="h-30 py-1 w-auto object-contain"
            />
          </Link>
          <Button variant="outline" >
           <Link href="/signin">Sign In</Link>
          </Button>
        </nav>
      </header>
    );
  }

  // If authenticated
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Sensai Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Industry Insights
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2">
                <StarsIcon className="h-4 w-4" />
                <span className="hidden md:block">Growth Tools</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/career" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> AI Career RoadMap
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resume" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Build Resume
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/ai-cover-letter" className="flex items-center gap-2">
                  <PenBox className="h-4 w-4" /> Cover Letter
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/interview" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Interview Prep
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
            Sign Out
          </Button>
        </div>
      </nav>
    </header>
  );
}
