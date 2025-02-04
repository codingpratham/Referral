import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient(); 

export const POST = async () => {
    const hashedPassword = await bcrypt.hash('frref', 10);

    await prisma.user.create({
      data: {
        name: "rfjejfr",
        password: hashedPassword
      }
    });

    return NextResponse.json({ message: "User created successfully" });
};
