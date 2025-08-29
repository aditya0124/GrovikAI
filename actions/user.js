"use server";
"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  // console.log("backend received:", data);

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    // 1️⃣ Check if industry already exists
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: data.industry },
    });

    // 2️⃣ If not exists, generate AI insights + create industry
    if (!industryInsight) {
      const insights = await generateAIInsights(data.industry); // AI call OUTSIDE transaction

      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // 3️⃣ Update the user (short + safe transaction)
    const result = await db.$transaction(
      async (tx) => {
        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      { timeout: 10000 } // 10s is enough, since only fast queries here
    );

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user & industry:", error.message);
    throw new Error("Failed to update profile");
  }
}


// import { db } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { generateAIInsights } from "./dashboard";

// export async function updateUser(data) {

//   console.log("backedn ",data);
//   // This Updateuser Function works For the Onboarding Form, if we click submit we get data from formto save in the Databse for this we need this 
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     throw new Error("User not authenticated");
//   }

//   const user = await db.user.findUnique({
//     where: { email: session.user.email },
//   });
//   console.log(user)

//   if (!user) {
//     throw new Error("User not found");
//   }

//   try {
//     console.log("data", data);
//     const result = await db.$transaction(async (tx) => {
//       // 1️⃣ Check if industry exists that we get from the data to creta a row, as we store unique industry so we must cross check
//       let industryInsight = await tx.industryInsight.findUnique({
//         where: { industry: data.industry },
//       });
//       // if we get industr insight i.e we get the full Industry Insight Table we only save the user, if not get industry create that one also & save them

//       // 2️⃣ If industry Insights not exists, generate + insert
//       if (!industryInsight) {
//         const insights = await generateAIInsights(data.industry);
//         console.log("insights :",insights);
//         industryInsight = await db.industryInsight.create({
//           data: {
//             industry: data.industry,
//             ...insights,
//             nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//           },
//         });
//       }

//       // 3️⃣ Update user
//       const updatedUser = await tx.user.update({
//         where: { id: user.id }, // jha pe koi id (in DB) == user.id hogi wha pe update kr dena ye sab
//         data: {
//           industry: data.industry,
//           experience: data.experience,
//           bio: data.bio,
//           skills: data.skills,
//         },
//       },{ timeout: 70000 });

//       return { updatedUser, industryInsight };
//     });

//     return { success: true, ...result };
//   } catch (error) {
//     console.error("Error updating user & industry:", error.message);
//     throw new Error("Failed to update profile");
//   }
// }


// ✅ API 2 :- Get Onboarding Status
export async function getUserOnboardingStatus() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { industry: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // ✅ true if onboarded, false if not
  return !!user.industry;
}
