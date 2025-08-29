// import { auth } from "@clerk/nextjs/server";
// // import db from "@/lib/prisma";
// import { notFound } from "next/navigation";

// export default async function CareerRoadmapPage({ params }) {
//   const { id } = await params; // ✅ this comes from the dynamic route [id]
// //   console.log(id);


//   const { userId } = auth();

//   if (!userId) return notFound();

// //   const roadmap = await db.careerRoadmap.findUnique({
// //     where: { id },
// //   });

// //   if (!roadmap || roadmap.userId !== userId) return notFound();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{roadmap.roadmapTitle}</h1>
//       <p className="mt-2 text-muted-foreground">{roadmap.description}</p>

//       <div className="mt-4">
//         <strong>Duration:</strong> {roadmap.duration}
//       </div>
//     </div>
//   );
// }

// import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import db from "@/lib/prisma";
import { getCareerRoadmapById } from "@/actions/career";
import RoadmapCanavas from "../_components/roadmapCanavas";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function CareerRoadmapPage({ params }) {
  const { id } = await params; // ✅ fix: await params

 const roadmap = await getCareerRoadmapById(id);

console.log(roadmap);


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col space-y-2 mb-4">
        <Link href="/career">
          <Button variant="link" className="gap-2 pl-0 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Back to Career Page
          </Button>
        </Link>
      </div>
      {/* Gradient Heading */}
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Career Roadmap
      </h1>

      {/* Enthusiastic Introduction */}
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        🌟 Generated Career Roadmap for the field of{" "}
        <span className="font-semibold text-purple-600">{roadmap.field}</span>.  
        This roadmap has been carefully designed to guide you step-by-step on your
        journey toward mastering <strong>{roadmap.field}</strong>. Over the next{" "}
        <strong>{roadmap.duration}</strong>, you’ll explore essential skills,
        hands-on projects, and progressive milestones. Stay consistent, stay
        motivated, and let this plan be your trusted compass 🚀. Remember,
        success isn’t about speed — it’s about persistence and passion. Follow
        this roadmap, adapt when needed, and you’ll build a strong foundation
        for an exciting and rewarding career in {roadmap.field}. 🌈
      </p>

      {/* Roadmap Details */}
      <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 border">
        <h2 className="text-xl font-bold text-muted-foreground">{roadmap.roadmapTitle}</h2>
        <p className="mt-2 text-gray-600">{roadmap.description}</p>
        <div className="mt-4 text-muted-foreground">
          <strong>Duration:</strong> {roadmap.duration}
        </div>
      </div>

      {/* React Flow Placeholder */}
      <div className="mt-10 p-6 border-2 border-dashed rounded-2xl text-center text-gray-500">
        {/* ⚡ React Flow Visualization will appear here */}
        <RoadmapCanavas initialNodes={roadmap?.initialNodes} initialEdges={roadmap?.initialEdges}/>
      </div>
    </div>
  );
}