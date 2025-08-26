import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { signIn } from "next-auth/react";
import { GithubSignIn } from "@/components/github-sign-in";
import { GoogleSignIn } from "@/components/google-sign-in";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 bg-background border border-border rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>

        <GithubSignIn />
        <GoogleSignIn />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
        </div>

        {/* Optional: Uncomment to add Email/Password sign-in
        <form ...>
          ...
        </form> */}

        {/* <div className="text-center">
          <Button asChild variant="link" className="text-muted-foreground">
            <Link href="/signup">Don&apos;t have an account? Sign up</Link>
          </Button> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Page;
