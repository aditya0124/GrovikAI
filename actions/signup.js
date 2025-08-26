// // /actions/signup.js (or .ts)
// "use server";

// import { db } from "@/lib/prisma";
// import { schema } from "@/lib/schema"; // your Zod schema
// import bcrypt from "bcryptjs";

// export async function signUp(formData) {
//   const data = Object.fromEntries(formData);
//   const validated = schema.safeParse(data);

//   if (!validated.success) {
//     return { success: false, error: "Invalid input" };
//   }

//   const { email, password } = validated.data;

//   const existingUser = await db.user.findUnique({ where: { email } });

//   if (existingUser) {
//     return { success: false, error: "Email already in use" };
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await db.user.create({
//     data: {
//        name: validated.data.name,
// email: validated.data.email,

//       password: hashedPassword,
//     },
//   });

//   return { success: true };
// }
// 

// 


// NEED when we use email +Login