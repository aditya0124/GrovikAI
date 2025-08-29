// import React from 'react'

// const career = () => {
//   return (
//     <div>career</div>
//   )
// }

// export default career


import CareerDialogPage from "./_components/carrerDialogPage";
import CareerListPage from "./_components/careerList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";




export default async function CareerPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Section 1: Header + Generate Button */}
      <div className="flex flex-col space-y-2 mb-4">
        <Link href="/">
          <Button variant="link" className="gap-2 pl-0 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Back to Home Page
          </Button>
        </Link>
      </div>
      <div className="mb-10">
        <CareerDialogPage />
      </div>

      {/* Section 2: Roadmap List */}
      <div className="mt-10">
        <CareerListPage />
      </div>
    </div>
  

  );
}
