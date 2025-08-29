


// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// import { generateCareerRoadmap } from "@/actions/career";

// const formSchema = z.object({
//   careerField: z.string().min(1, "Career field is required"),
//   timeDuration: z.string().optional(),
// });

// export default function CareerDialogPage() {
//   const [open, setOpen] = useState(false);
// //   const { toast } = useToast();
//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: { careerField: "", timeDuration: "" },
//   });

//   async function onSubmit(values) {
//     try {
//       const roadmap = await generateCareerRoadmap({
//         field: values.careerField,
//         timeCommitment: values.timeDuration,
//       });

//       setOpen(false);
//       router.push(`/career/${roadmap.id}`);
//     } catch (err) {
//         console.log(err);
//     //   toast({
//     //     title: "Error",
//     //     description: "Failed to generate roadmap",
//     //     variant: "destructive",
//     //   });
//     }
//   }

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
//       {/* Title */}
//       <h1 className="gradient text-4xl md:text-6xl font-bold gradient-title text-center md:text-left">
//         Career Roadmaps
//       </h1>

//       {/* Dialog Trigger */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button variant="default">Generate Career Roadmap</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create Career Roadmap</DialogTitle>
//             <DialogDescription>
//               Enter your career field and optional time duration.
//             </DialogDescription>
//           </DialogHeader>

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-4 mt-4"
//             >
//               <FormField
//                 control={form.control}
//                 name="careerField"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Career Field</FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g. Web Developer" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="timeDuration"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Time Duration</FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g. 6-12 months" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button type="submit" className="w-full">
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { generateCareerRoadmap } from "@/actions/career";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

const formSchema = z.object({
  careerField: z.string().min(1, "Career field is required"),
  timeDuration: z.string().optional(),
});

export default function CareerDialogPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { careerField: "", timeDuration: "" },
  });

  // ✅ useFetch hook for async request
  const {
    loading,
    fn: generateCareerRoadmapFn,
    data: roadmap,
  } = useFetch(generateCareerRoadmap);

  // ✅ If roadmap is ready, redirect & reset dialog
  useEffect(() => {
    if (roadmap) {
      setOpen(false);
      form.reset();
      router.push(`/career/${roadmap.id}`);
    }
  }, [roadmap, form, router]);

  async function onSubmit(values) {
    try {
      form.reset();
      await generateCareerRoadmapFn({
        field: values.careerField,
        timeCommitment: values.timeDuration,
      });
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate roadmap");
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* Title */}
      <h1 className="gradient text-4xl md:text-6xl font-bold gradient-title text-center md:text-left">
        Career Roadmaps
      </h1>

      {/* Dialog */}
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) form.reset(); // reset when closed
          setOpen(isOpen);
        }}
      >
        <DialogTrigger asChild>
          <Button variant="default">Generate Career Roadmap</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Career Roadmap</DialogTitle>
            <DialogDescription>
              Enter your career field and optional time duration.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="careerField"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Career Field</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Web Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 6-12 months" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={loading} // disable when loading
              >
                {loading ? (
                  <BarLoader width={"100%"} color="white" />
                ) : (
                  "Generate"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
