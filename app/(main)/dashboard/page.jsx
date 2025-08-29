// import { getUserData } from "@/actions/getUser";

// export default async function DashboardPage() {
//   let user;

//   try {
//     user = await getUserData();
//     console.log(user);
//   } catch (error) {
//     return <div className="text-red-500">Unauthorized: {error.message}</div>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Welcome!</h1>
//       <p>Industry: {user.name}</p>
//       <p>Skills: {user.email}</p>
//       <p>{user.id}</p>
//     </div>
//   );
// }

import { getIndustryInsights } from '@/actions/dashboard'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'
import DashboardView from './_components/dashboard-view'

const IndustryInsightsPage = async() => {
  const isOnboarded = await getUserOnboardingStatus()
  // console.log("Onboarding Status:", isOnboarded)
  // If not onboarded, redirect to onboarding page
    if (!isOnboarded) {
      // redirect to home page
      redirect('/onboarding')
    }


    // insights 
    const insights = await getIndustryInsights();
  return (
    <div>
      <DashboardView insights={insights}/>
    </div>
  )
}

export default IndustryInsightsPage

// import { getIndustryInsights } from "@/actions/dashboard";
// import DashboardView from "./_components/dashboard-view";
// import { getUserOnboardingStatus } from "@/actions/user";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const { isOnboarded } = await getUserOnboardingStatus();

//   // If not onboarded, redirect to onboarding page
//   // Skip this check if already on the onboarding page
//   if (isOnboarded) {
//     redirect("/onboarding");
//   }

//   const insights = await getIndustryInsights();
//   console.log(insights);

//   return (
//     <div className="container mx-auto">
//       {/* <DashboardView insights={insights} /> */}
//     </div>
//   );
// }


/* 
{ Industry Insight we get 
  id: 'cmeli04hf0000vba0piqooulv',
  industry: 'tech-software-development',
  salaryRanges: [
    {
      max: 150000,
      min: 80000,
      role: 'Software Engineer',
      median: 115000,
      location: 'US'
    },
    {
      max: 180000,
      min: 90000,
      role: 'Data Scientist',
      median: 135000,
      location: 'US'
    },
    {
      max: 140000,
      min: 70000,
      role: 'Frontend Developer',
      median: 105000,
      location: 'US'
    },
    {
      max: 145000,
      min: 75000,
      role: 'Backend Developer',
      median: 110000,
      location: 'US'
    },
    {
      max: 170000,
      min: 95000,
      role: 'DevOps Engineer',
      median: 130000,
      location: 'US'
    },
    {
      max: 160000,
      min: 85000,
      role: 'Project Manager',
      median: 120000,
      location: 'US'
    }
  ],
  growthRate: 7.5,
  demandLevel: 'High',
  topSkills: [ 'Python', 'Java', 'JavaScript', 'Cloud Computing', 'Agile' ],
  marketOutlook: 'Positive',
  keyTrends: [
    'AI/ML',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Remote Work'
  ],
  recommendedSkills: [ 'Python', 'AWS', 'Kubernetes', 'React', 'SQL' ],
  lastUpdated: 2025-08-21T14:29:51.056Z,
  nextUpdate: 2025-08-28T14:29:51.045Z
}
*/