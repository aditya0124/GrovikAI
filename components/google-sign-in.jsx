"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
// import { FcGoogle } from "react-icons/fc"; // Optional: Google icon from react-icons
import { Google } from "@/components/ui/google"; // If you have a custom Google icon component

export function GoogleSignIn() {
  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <Button onClick={handleSignIn} className="w-full" variant="outline">
      <Google className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  );
}
