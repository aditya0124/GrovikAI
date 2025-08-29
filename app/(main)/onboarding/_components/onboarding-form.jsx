
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// // import useFetch from "@/hooks/use-fetch";
// import { onboardingSchema } from "@/app/lib/schema";
// import { updateUser } from "@/actions/user";
// import useFetch from "@/hooks/use-fetch";

// const OnboardingForm = ({ industries }) => {
//   const router = useRouter();  // help in navogate to other Page
//   const [selectedIndustry, setSelectedIndustry] = useState(null);

//   const {
    
//     fn: updateUserFn,
//     // Toh haan, updateUserFn ek wrapped/modified version hai updateUser ka, jisme state management bhi hota hai.

// // 🔥 Isliye kehte hain updateUserFn is a “wrapped” version of updateUser

// //these are reponse we get from the updateUser through useFetch hook
//     loading: updateLoading,
//     data: updateResult,
//   } = useFetch(updateUser);  //take updateUser Fn as argument & return its state like loading, data, error etc

//   //telling useFetch:

// // “Hey! This is the function I want to run (updateUser). 
// // Give me back a new wrapped version of it, and also let me know when it's loading or finishe


//   //  like in react RTK query we get some imbuilt thing when we fetch data like error, is Loading..
//   // Similiary we made a custom hook useFetch which takes a function (like your updateUser) and gives you its state like isLoading data, error etc,
//   // so we need it multiple Time so we have to made a custom hook for fetch:- whenever we eftch data from somewher we reuse that hook

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm({
//     resolver: zodResolver(onboardingSchema),
//   });

  
//   const onSubmit = async (values) => {

//         // console.log(values);

//     //my onsubmit
//     try {
//       const formattedIndustry = `${values.industry}-${values.subIndustry
//         .toLowerCase()
//         .replace(/ /g, "-")}`; //replace spaces with --(hyphen)
//         // looks like  tech-software-development

//       await updateUserFn({
//         ...values,
//         industry: formattedIndustry,
//       });
//     } catch (error) {
//       console.error("Onboarding error:", error);
//     }
//   };





//   useEffect(() => {
//     if (updateResult?.success && !updateLoading) {   // if update is successful & it no longer loading, i.e we sucessfully loaded the data
//       // then do :- push them to dashboard & made a toast
//       toast.success("Profile completed successfully!");
//       router.push("/dashboard");
//       router.refresh();
//     }
//   }, [updateResult, updateLoading]); //only run when these two thing changes

//   const watchIndustry = watch("industry");
//   // means you watch subindustry only when industry is selected

//   return (
//     <div className="flex items-center justify-center bg-background">
//       <Card className="w-full max-w-lg mt-10 mx-2">
//         <CardHeader>
//           <CardTitle className=" gradient gradient-title text-4xl">
//             Complete Your Profile
//           </CardTitle>
//           <CardDescription>
//             Select your industry to get personalized career insights and
//             recommendations.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="industry">Industry</Label>
//               <Select
//                 onValueChange={(value) => {
//                   setValue("industry", value);
//                   setSelectedIndustry(
//                     industries.find((ind) => ind.id === value)
//                   );
//                   setValue("subIndustry", "");
//                 }}
//               >
//                 <SelectTrigger id="industry">
//                   <SelectValue placeholder="Select an industry" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Industries</SelectLabel>
//                     {industries.map((ind) => (
//                       <SelectItem key={ind.id} value={ind.id}>
//                         {ind.name}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               {errors.industry && (
//                 <p className="text-sm text-red-500">
//                   {errors.industry.message}
//                 </p>
//               )}
//               {/* error for if anyone not submit the industrt & click Submit btn
//               we get error from zod resolver
//                */}
//             </div>
// {/* SUBINDUSTRY */}
//             {watchIndustry && (
//               <div className="space-y-2">
//                 <Label htmlFor="subIndustry">Specialization</Label>
//                 <Select
//                   onValueChange={(value) => setValue("subIndustry", value)}
//                 >
//                   <SelectTrigger id="subIndustry">
//                     <SelectValue placeholder="Select your specialization" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>Specializations</SelectLabel>
//                       {selectedIndustry?.subIndustries.map((sub) => (
//                         <SelectItem key={sub} value={sub}>
//                           {sub}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//                 {errors.subIndustry && (
//                   <p className="text-sm text-red-500">
//                     {errors.subIndustry.message}
//                   </p>
//                 )}
//               </div>
//             )}

// {/* EXPERIENCE */}
//             <div className="space-y-2">
//               <Label htmlFor="experience">Years of Experience</Label>
//               <Input
//                 id="experience"
//                 type="number"
//                 min="0"
//                 max="50"
//                 placeholder="Enter years of experience"
//                 {...register("experience")}  //FROM ZOD RESOLVER
//               />
//               {errors.experience && (
//                 <p className="text-sm text-red-500">
//                   {errors.experience.message}
//                 </p>
//               )}
//             </div>
//     {/* SKILLS */}
//             <div className="space-y-2">
//               <Label htmlFor="skills">Skills</Label>
//               <Input
//                 id="skills"
//                 placeholder="e.g., Python, JavaScript, Project Management"
//                 {...register("skills")}
//               />
//               <p className="text-sm text-muted-foreground">
//                 Separate multiple skills with commas
//               </p>
//               {errors.skills && (
//                 <p className="text-sm text-red-500">{errors.skills.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="bio">Professional Bio</Label>
//               <Textarea
//                 id="bio"
//                 placeholder="Tell us about your professional background..."
//                 className="h-32"
//                 {...register("bio")}
//               />
//               {errors.bio && (
//                 <p className="text-sm text-red-500">{errors.bio.message}</p>
//               )}
//             </div>

//             <Button type="submit" className="w-full" disabled={updateLoading}>
//               {updateLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 "Complete Profile"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default OnboardingForm;



// // For FOrm we use react hook form & ZOD & resolvers for make sure bth zod & react hook works properly


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";
import useFetch from "@/hooks/use-fetch";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();  // help in navogate to other Page
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    
    fn: updateUserFn,
    // Toh haan, updateUserFn ek wrapped/modified version hai updateUser ka, jisme state management bhi hota hai.

// 🔥 Isliye kehte hain updateUserFn is a “wrapped” version of updateUser

//these are reponse we get from the updateUser through useFetch hook
    loading: updateLoading,
    data: updateResult,
  } = useFetch(updateUser);  //take updateUser Fn as argument & return its state like loading, data, error etc

  //telling useFetch:

// “Hey! This is the function I want to run (updateUser). 
// Give me back a new wrapped version of it, and also let me know when it's loading or finishe


  //  like in react RTK query we get some imbuilt thing when we fetch data like error, is Loading..
  // Similiary we made a custom hook useFetch which takes a function (like your updateUser) and gives you its state like isLoading data, error etc,
  // so we need it multiple Time so we have to made a custom hook for fetch:- whenever we eftch data from somewher we reuse that hook

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  
  const onSubmit = async (values) => {

        // console.log(values);

    //my onsubmit
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`; //replace spaces with --(hyphen)
        // looks like  tech-software-development

    //     const payload = { ...values, industry: formattedIndustry };
    // console.log("Payload to backend:", payload);  // <--- check this

    // await updateUserFn(payload);
      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };





  useEffect(() => {
    if (updateResult?.success && !updateLoading) {   // if update is successful & it no longer loading, i.e we sucessfully loaded the data
      // then do :- push them to dashboard & made a toast
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]); //only run when these two thing changes

  const watchIndustry = watch("industry");
  // means you watch subindustry only when industry is selected

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className=" gradient gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
              {/* error for if anyone not submit the industrt & click Submit btn
              we get error from zod resolver
               */}
            </div>
{/* SUBINDUSTRY */}
            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select
                  onValueChange={(value) => setValue("subIndustry", value)}
                >
                  <SelectTrigger id="subIndustry">
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>
                      {selectedIndustry?.subIndustries.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

{/* EXPERIENCE */}
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}  //FROM ZOD RESOLVER
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>
    {/* SKILLS */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;



// For FOrm we use react hook form & ZOD & resolvers for make sure bth zod & react hook works properly