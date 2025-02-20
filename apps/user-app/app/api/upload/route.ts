/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db/client";

export async function POST(req: Request) {
  try {
    // Get session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse JSON data
    const data = await req.json();

    if (!data.name || !data.bio) {
      return NextResponse.json({ error: "Name and bio are required" }, { status: 400 });
    }

    // Check if user already has info
    const userInfo = await prisma.info.findFirst({
      where: { userId: session.user.id },
    });

    if (userInfo) {
      return NextResponse.json({ error: "User info already exists" }, { status: 400 });
    }

    // Ensure data is in correct format
    const parseJSON = <T>(key: string, defaultValue: T): T => {
      try {
        return data[key] ? JSON.parse(data[key]) : defaultValue;
      } catch (error) {
        console.error(`Invalid JSON format for ${key}:`, error);
        return defaultValue;
      }
    };

    const experience = Array.isArray(data.experience) ? data.experience : [];
const education = Array.isArray(data.education) ? data.education : [];
const projects = Array.isArray(data.projects) ? data.projects : [];
const skills = Array.isArray(data.skills) ? data.skills.map((skill: any) => ({ name: skill })) : [];

const info = await prisma.info.create({
  data: {
    name: data.name,
    bio: data.bio,
    user: { connect: { id: session.user.id } },

    experience: {
      create: experience.map((exp:any) => ({
        company: exp.company,
        position: exp.position,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
      })),
    },

    education: {
      create: education.map((edu:any) => ({
        institution: edu.institution,
        degree: edu.degree,
        startDate: edu.startDate,
        endDate: edu.endDate,
        fieldOfStudy: edu.fieldOfStudy,
        grade: edu.grade,
      })),
    },

    projects: {
      create: projects.map((proj:any) => ({
        title: proj.title,
        description: proj.description,
      })),
    },

    skills: {
      create: skills.map((skill:any) => ({
        name: skill.name,
      })),
    },
  },
});


    return NextResponse.json({ message: "Profile created successfully", info }, { status: 201 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
