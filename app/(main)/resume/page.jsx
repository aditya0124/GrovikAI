
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ResumePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl p-6 text-center">
        <CardHeader>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-primary"
          >
            In Progress
          </motion.h1>
        </CardHeader>
        <CardContent>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-muted-foreground mt-4" // 👈 adds distance
          >
            🚀 Coming Soon...
          </motion.p>
        </CardContent>
      </Card>
    </div>
  );
}
