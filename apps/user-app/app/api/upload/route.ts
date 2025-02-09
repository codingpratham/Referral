import { prisma } from "@repo/db/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const POST = async (req: Request) => {
    try {
        const requestBody = await req.json();
        const credentials = requestBody?.credentials;

        // ✅ Validate input
        if (!credentials?.name || !credentials.bio || !credentials.description) {
            return NextResponse.json({ error: "Name, bio, and description are required" }, { status: 400 });
        }

        // ✅ Get user session
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        // ✅ Helper function to safely format date values
        const formatDate = (date: string | null) => (date ? new Date(date) : null);

        // ✅ Prepare data
        const experienceData = credentials.experience?.map((exp: any) => ({
            company: exp.company,
            position: exp.position,
            startDate: formatDate(exp.startDate),
            endDate: formatDate(exp.endDate),
            description: exp.description,
            userId,  // Ensure relation to User
        })) ?? [];

        const educationData = credentials.education?.map((edu: any) => ({
            institution: edu.institution,
            degree: edu.degree,
            startDate: formatDate(edu.startDate),
            endDate: formatDate(edu.endDate),
            fieldOfStudy: edu.fieldOfStudy,
            grade: edu.grade,
            userId,  // Ensure relation to User
        })) ?? [];

        const projectData = credentials.projects?.map((proj: any) => ({
            title: proj.title,
            description: proj.description,
            userId,  // Ensure relation to User
        })) ?? [];

        const skillData = credentials.skills?.map((skill: any) => ({
            name: skill.name,
            userId,  // Ensure relation to User
        })) ?? [];

        // ✅ Create user with related data
        const user = await prisma.user.create({
            data: {
                id: userId,
                name: credentials.name,
                bio: credentials.bio,
                description: credentials.description,
                experience: { create: experienceData },
                education: { create: educationData },
                projects: { create: projectData },
                skills: { create: skillData },
            },
        });

        return NextResponse.json({ message: "User created successfully", user }, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
