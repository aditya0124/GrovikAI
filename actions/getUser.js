// // actions/getUserData.js
// "use server";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";  // Your NextAuth options file
// import { db } from "@/lib/prisma";
// // getServerSession(authOptions) to get the currently logged-in user's session.
// // From session, we get user.email and fetch the user from DB.
// // Then, query coverLetter table with user.id as userId foreign key.
// export async function getUserData() {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user?.email) {
//     throw new Error("Unauthorized");
//   }

//   const user = await db.user.findUnique({
//     where: { email: session.user.email }
//   });

//   if (!user) throw new Error("User not found");

//   return user;
// }
