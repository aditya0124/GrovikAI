// components/GithubSignIn.jsx

// import { signIn } from "@/lib/auth";
// import { signIn } from "@/lib/actions";

// import { signIn } from "next-auth/react";


// import { Button } from "@/components/ui/button";
// import { Github } from "@/components/ui/github";
// // import {  GithubIcon } from "lucide-react";

// const GithubSignIn = () => {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signIn("github");
//       }}
//     >
//       <Button className="w-full" variant="outline">
//         <Github />
//         Continue with GitHub
//       </Button>
//     </form>
//   );
// };

// export { GithubSignIn };

"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
// import { GithubIcon } from "lucide-react";
import { Github } from "@/components/ui/github";

export function GithubSignIn() {
  const handleSignIn = () => {
    signIn("github"); // this runs in the browser
  };

  return (
    <Button onClick={handleSignIn} className="w-full" variant="outline">
      <Github className="mr-2 h-4 w-4" />
      Continue with GitHub
    </Button>
  );
}
