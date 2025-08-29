// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { format } from "date-fns";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";

// export default async function CareerListPage() {
//   const { userId: clerkUserId } = await auth();
//   if (!clerkUserId) return <p>Please log in to view roadmaps.</p>;

//   const user = await db.user.findUnique({
//     where: { clerkUserId },
//     include: { careerRoadmaps: true },
//   });

//   if (!user) return <p>User not found.</p>;

//   if (user.careerRoadmaps.length === 0) {
//     return <p className="text-muted-foreground">No roadmaps yet. Generate one!</p>;
//   }

//   return (
//     <div className="grid gap-4 md:grid-cols-2 mt-6">
//       {user.careerRoadmaps.map((roadmap) => (
//         <Card
//           key={roadmap.id}
//           className="cursor-pointer hover:bg-muted/50 transition-colors"
//           onClick={() => (window.location.href = `/career/${roadmap.id}`)}
//         >
//           <CardHeader>
//             <CardTitle className="gradient gradient-title text-2xl">
//               {roadmap.roadmapTitle}
//             </CardTitle>
//             <CardDescription>
//               {roadmap.description?.slice(0, 80)}...
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="flex justify-between text-sm text-muted-foreground">
//             <span>Duration: {roadmap.duration || "N/A"}</span>
//             <span>{format(new Date(roadmap.createdAt), "MMM dd, yyyy")}</span>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }


// 

import { getCareers } from "@/actions/career";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CareerListPage() {
  let careers;

  try {
    careers = await getCareers();
  } catch (error) {
    console.error("Auth error or fetch failed:", error.message);
    return redirect("/sign-in"); // or show message
  }

  if (!careers || careers.length === 0) {
    return <p className="text-muted-foreground">No roadmaps yet. Generate one!</p>;
  }

  return (
    <div className="space-y-6 mt-6">
      {/* Title Section */}
      <div>
        <h1 className="gradient gradient-title text-3xl md:text-4xl">
          Your Generated Roadmaps
        </h1>
        <p className="text-muted-foreground">
          Explore and follow your personalized career paths
        </p>
      </div>

      {/* Roadmap Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {careers.map((roadmap) => (
          <Link href={`/career/${roadmap.id}`} key={roadmap.id}>
            <Card className="p-4 hover:shadow-lg transition-all cursor-pointer">
              <h2 className="font-semibold text-lg">{roadmap.roadmapTitle}</h2>
              <p className="text-muted-foreground text-sm line-clamp-2">{roadmap.description}</p>
              <p className="text-xs mt-2">⏳ {roadmap.duration}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}