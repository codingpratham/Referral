import { prisma } from "@repo/db/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Define TypeScript interfaces
interface Credentials {
    bio: string;
    description: string;
    name: string;
    experience: Experience[];
    educations: Education[];
    projects: Project[];
    skills: Skill[];
}

interface Skill {
    name: string;
}

interface Project {
    title: string;
    description: string;
}

interface Education {
    institution: string;
    degree: string;
    startDate: Date;
    endDate: Date;
    fieldOfStudy: string;
    grade: string;
}

interface Experience {
    company: string;
    position: string; // ✅ Fix: Use "position" instead of "title"
    startDate: Date;
    endDate: Date;
    description: string;
}

export const POST = async (req: Request) => {
    try {
        const requestBody = await req.json().catch(() => null);

        if (!requestBody?.credentials) {
            return NextResponse.json({ error: "Invalid or missing credentials" }, { status: 400 });
        }

        const credentials: Credentials = requestBody.credentials;

        // Fetch user session
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id; // ✅ Get user ID from session

        // Ensure required fields are provided
        if (!credentials) {
            return NextResponse.json({ error: "Name, bio, and description are required" }, { status: 400 });
        }

        // ✅ Create user with relations using `create`
        const user = await prisma.user.create({
            data: {
                id: userId,
                name: credentials.name,
                bio: credentials.bio,
                description: credentials.description,
                experience: {
                    create: credentials.experience?.map(exp => ({
                        company: exp.company,
                        position: exp.position, 
                        startDate: exp.startDate.toISOString(),
                        endDate: exp.endDate.toISOString(),
                        description: exp.description,
                        userId
                    })),
                },
                education: {
                    create: credentials.educations.map((edu) => ({
                        institution:edu.institution,
                        degree:edu.degree,
                        startDate:edu.startDate.toISOString(),
                        endDate:edu.endDate.toISOString(),
                        fieldOfStudy:edu.fieldOfStudy,
                        grade:edu.grade,
                        userId
                    })),
                },
                projects: {
                    create: credentials.projects.map((p) => ({
                        title: p.title,
                        description: p.description,
                        userId
                    })),
                },
                skills: {
                    create: credentials.skills.map((s) => ({
                        name: s.name,
                        userId
                    })),
                },
            },
        });

        return NextResponse.json({ message: "User created successfully", user }, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
