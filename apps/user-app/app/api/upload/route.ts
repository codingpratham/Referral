/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@repo/db/client";
import { z } from "zod";


const profileSchema = z.object({
  bio: z.string().optional(),
  description: z.string().optional(),
  experience: z
    .array(
      z.object({
        company: z.string(),
        position: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        fieldOfStudy: z.string(),
        grade: z.string(),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  skills: z.array(z.string()).optional(),
});

export default async function handler(req : any, res:any) {
  if (req.method === "POST") {
    try {
      const validatedData = profileSchema.parse(req.body);
      const newProfile = await prisma.user.create({
        data: {
          bio: validatedData.bio,
          description: validatedData.description,
          experience: { create: validatedData.experience || [] },
          education: { create: validatedData.education || [] },
          projects: { create: validatedData.projects || [] },
          skills: { create: validatedData.skills?.map((name) => ({ name })) || [] },
        },
        include: { experience: true, education: true, projects: true, skills: true },
      });

      res.status(201).json(newProfile);
    } catch (error) {
      res.status(400).json({ error: "error" });
    }
  } else if (req.method === "GET") {
    try {
      const profiles = await prisma.user.findMany({
        include: { experience: true, education: true, projects: true, skills: true },
      });

      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
