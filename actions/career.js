
"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateCareerRoadmap(data) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
Generate a React flow tree-structured learning roadmap for the user input position/skills: ${data.field}.

Use the following format:
- Vertical tree structure with meaningful x/y positions to form a flow
- Structure should be similar to roadmap.sh layout
- Steps should be ordered from fundamentals to advanced
- Include branching for different specializations (if applicable)
- Each node must have a title, short description, and a learning resource link
- Use unique IDs for all nodes and edges
- Make node positions more spacious:
   * Space nodes vertically by at least 200-250px on the y-axis
   * When branching, shift x positions by at least 250-300px to avoid overlap
   * Do not stack nodes on top of each other

Respond in JSON format as follows:

{
  "roadmapTitle": "string",
  "description": "<3-5 lines>",
  "duration": "${data.timeCommitment}",
  "initialNodes": [
    {
      "id": "1",
      "type": "turbo", //type turbo only everytime
      "position": { "x": 0, "y": 0 },
      "data": {
        "title": "Step Title",
        "description": "Short two-line explanation of what the step covers.",
        "link": "Helpful link for learning this step"
      }
    }
  ],
  "initialEdges": [
    {
      "id": "e1-2",
      "source": "1",
      "target": "2"
    }
  ]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    // Strip markdown code block formatting if AI includes it
    const cleaned = content.replace(/```json|```/g, "").trim();

    let roadmapData;
    try {
      roadmapData = JSON.parse(cleaned);
    } catch (e) {
      console.error("AI returned invalid JSON:\n", cleaned);
      throw new Error("AI response is not valid JSON");
    }

    const savedRoadmap = await db.careerRoadmap.create({
      data: {
        userId: user.id,
        field: data.field,
        timeCommitment: data.timeCommitment,

        roadmapTitle: roadmapData.roadmapTitle,
        description: roadmapData.description,
        duration: roadmapData.duration,

        initialNodes: roadmapData.initialNodes,
        initialEdges: roadmapData.initialEdges,
      },
    });

    return savedRoadmap;

    //   const parsed = JSON.parse(cleaned);
    // console.log("🧠 AI Generated Roadmap:");
    // console.dir(roadmapData, { depth: null }); // Show nested JSON cleanly

    // return parsed;
  } catch (err) {
    console.error("Error generating roadmap:", err.message);
    throw new Error("Failed to generate roadmap");
  }
}


// API 2 :-


export async function getCareerRoadmapById(careerId) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return redirect("/sign-in");

  try {
    const roadmap = await db.careerRoadmap.findUnique({
      where: { id: careerId },
    });

    if (!roadmap || roadmap.userId !== user.id) {
      throw new Error("Roadmap not found or unauthorized");
    }

    return roadmap;
  } catch (error) {
    console.error("Error fetching career roadmap:", error);
    throw new Error("Failed to fetch career roadmap");
  }
}



// Api 3:-
export async function getCareers() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  try {
    const careers = await db.careerRoadmap.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    return careers;
  } catch (error) {
    console.error("Error fetching careers:", error);
    throw new Error("Failed to fetch careers");
  }
}




// 



// export async function generateCareerRoadmap(data) {
//   const { userId: clerkUserId } = await auth();
//   if (!clerkUserId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId },
//   });

//   if (!user) throw new Error("User not found");

//   const prompt = `
// Generate a React flow tree-structured learning roadmap for user input position/skills: ${data.field}

// Format:
// - Vertical tree structure with meaningful x/y positions to form a flow
// - Structure should be similar to roadmap.sh layout
// - Steps should be ordered from fundamentals to advanced
// - Include branching for different specializations (if applicable)
// - Each node must have a title, short description, and learning resource link
// - Use unique IDs for all nodes and edges
// - Make it more spacious in node position

// Response in JSON format:
// {
//   roadmapTitle: "string",
//   description: "3–5 line overview",
//   duration: "${data.timeCommitment}",
//   initialNodes: [...],
//   initialEdges: [...]
// }
// `;

//   try {
//     const result = await model.generateContent(prompt);
//     const content = result.response.text().trim();

//     // Parse JSON safely
//     let roadmapData;
//     try {
//       roadmapData = JSON.parse(content);
//     } catch (e) {
//       console.error("AI response is not valid JSON:", content);
//       throw new Error("Invalid AI response");
//     }

//     const savedRoadmap = await db.careerRoadmap.create({
//       data: {
//         userId: user.id,
//         field: data.field,
//         timeCommitment: data.timeCommitment,
//         prompt,

//         roadmapTitle: roadmapData.roadmapTitle,
//         description: roadmapData.description,
//         duration: roadmapData.duration,

//         initialNodes: roadmapData.initialNodes,
//         initialEdges: roadmapData.initialEdges,
//       },
//     });

//     return savedRoadmap;
//   } catch (err) {
//     console.error("Error generating roadmap:", err.message);
//     throw new Error("Failed to generate roadmap");
//   }
// }
// // ✅ Get All Roadmaps (for current user)


// // API 2
// // export async function getCareerRoadmaps() {
// //   const { userId: clerkUserId } = await auth();
// //   if (!clerkUserId) throw new Error("Unauthorized");

// //   const user = await db.user.findUnique({
// //     where: { clerkUserId },
// //   });

// //   if (!user) throw new Error("User not found");

// //   return await db.careerRoadmap.findMany({
// //     where: {
// //       userId: user.id,
// //     },
// //     orderBy: {
// //       createdAt: "desc",
// //     },
// //   });
// // }

// // export async function getCareerRoadmap(id) {
// //   const { userId: clerkUserId } = await auth();
// //   if (!clerkUserId) throw new Error("Unauthorized");

// //   const user = await db.user.findUnique({
// //     where: { clerkUserId },
// //   });

// //   if (!user) throw new Error("User not found");

// //   return await db.careerRoadmap.findUnique({
// //     where: {
// //       id,
// //       userId: user.id,
// //     },
// //   });
// // }


// 

/*
SCHEMA
model CareerRoadmap {
  id             String   @id @default(uuid())
  userId         String
  field          String
  timeCommitment String
//   prompt         Stringno need

  roadmapTitle   String
  description    String
  duration       String

  initialNodes   Json
  initialEdges   Json

  createdAt      DateTime @default(now())

  user           User     @relation(fields: [userId], references: [id])
}



*/