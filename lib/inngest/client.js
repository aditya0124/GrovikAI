import { Inngest } from "inngest";
// Create a client to send & recieve events
export const inngest = new Inngest({
  id: "senseai", 
  name: "SenseAI Inngest Client", 
//   credentials: {
//    gemini:{
//     apiKey : process.env.GEMINI_API_KEY, // Gemini API key from environment variables
//    } 
//   }
});