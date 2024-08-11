import { PrismaClient } from "@prisma/client";
declare global {
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}
let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") { // if production proceed normaly
  prisma = new PrismaClient({
    errorFormat:'minimal'
  })
} else { // else, use a global cache for prisma client to avoid max_connection errors
  //@ts-ignore
  if (!global.prisma) {
    //@ts-ignore
    global.prisma = new PrismaClient({
      errorFormat:'minimal'
    })
  }
  //@ts-ignore
  prisma = global.prisma
}
export default prisma

