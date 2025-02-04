import { PrismaClient } from "@prisma/client"

const prismaSingleton = globalThis as unknown as {prisma:PrismaClient}

export const prisma = prismaSingleton.prisma || new PrismaClient()

if(process.env.NODE_ENV === 'production') prismaSingleton.prisma=prisma