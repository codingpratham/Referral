import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (!data.name || !data.bio) {
      return NextResponse.json(
        { error: "Name and bio are required" },
        { status: 400 }
      );
    }

    // Check if user already has info
    const userInfo = await prisma.info.findFirst({
      where: { userId: session.user.id },
    });

    if (userInfo) {
      return NextResponse.json(
        { error: "User info already exists" },
        { status: 400 }
      );
    }

    // Parse JSON data safely
    const parseJSON = (key: string, defaultValue = "[]") => {
      try {
        return JSON.parse(data[key] || defaultValue);
      } catch (error) {
        console.error(`Invalid JSON format for ${key}:`, error);
        return [];
      }
    };

    const experience = parseJSON("experience");
    const education = parseJSON("education");
    const projects = parseJSON("projects");
    const skills = parseJSON("skills").map((skill: string) => ({ name: skill }));

    const info = await prisma.info.create({
      data: {
        name: data.name,
        bio: data.bio,
        user: { connect: { id: session.user.id } },
        experience: { create: experience },
        education: { create: education },
        projects: { create: projects },
        skills: { create: skills },
      },
    });

    return NextResponse.json(
      { message: "Profile created successfully", info },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await prisma.user.deleteMany({});
    return NextResponse.json(
      { message: "All users deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting users:", error);
    return NextResponse.json(
      { error: "Failed to delete users" },
      { status: 500 }
    );
  }
}
