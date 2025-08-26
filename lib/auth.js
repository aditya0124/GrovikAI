
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/prisma";
import { schema } from "@/lib/schema";

export const authOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
     GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//     const validated = schema.parse(credentials);

//     const user = await db.user.findUnique({
//       where: { email: validated.email },
//     });

//     if (!user || !user.password) return null;

//     const isValid = await bcrypt.compare(validated.password, user.password);
//     if (!isValid) return null;

//     return user;
//   },
//     }),
  ],

  session: {
    strategy: "jwt",
  },

//   callbacks: {
//     async jwt({ token, account }) {
//       if (account?.provider === "credentials") {
//         token.credentials = true;
//       }
//       return token;
//     },
//   },
callbacks: {
  async signIn({ user, account, profile, email }) {
    // Check if this is a new user
    // const existing = await db.user.findUnique({ where: { email: user.email } });

    // if (!existing) {
    //   // Redirect new users to onboarding
    //   return "/onboarding";
    // }

    return true; // Continue
  },
},
// pages: {
//     error: "/error", // <== Add this line to redirect errors to your custom error page
//   },

  secret: process.env.NEXTAUTH_SECRET,
};

