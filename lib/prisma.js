import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient(); //if globalDb exist use that otherwise create a new instance of PrismaClient
// every time when we refresh i create a new instance of PrismaClient, so to avoid that , we have to stre to it global object

if(process.env.NODE_ENV !== "production") { // we are not on production, we re are on development
  // this is to avoid creating multiple instances of PrismaClient in development mode   
    // because in development mode, the server restarts on every file change

  globalThis.prisma = db;
}