"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateAIInsights = async (industry) => {
  const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text(); //get from gemini
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
  console.log("cleaned Text",cleanedText);

};

export async function getIndustryInsights() {
   const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }
  
//     const user = await db.user.findUnique({
//     where: { session?.user?.userId: userId },
//     include: {
//       industryInsight: true, //include the industry insights also when fetch user 
//     },
//   });
const user = await db.user.findUnique({
  where: { email: session.user.email },
  include: { industryInsight: true },
});

if (!user) throw new Error("User not found");

  
    if (!user) {
      throw new Error("User not found");
    }

 

//   if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  // in reality no need of its:- ie when user select industry during onboarding we create industry insight at that time only
  // but for safety we keep this check also
// no case arise when industry exist kr rha h aur uska insight nhi exist kr rha h, because at time we save
// industry in updateuser fn we also create industry insight same time :- 

// ye fn bas us save insight ko fetch kr ke dashboard ko bhej rha h , bas :- yha generation ki koi need nhi h
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);
// creatae a new industry insight & save in DB
    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,  // sari fields (salaryRanges, skills, etc.) yahin inject ho ja rahi hai
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}