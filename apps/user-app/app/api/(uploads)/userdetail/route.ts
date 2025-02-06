import upload from "@/lib/multer"
import { prisma } from "@repo/db/client";
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react";
import NextAuth from "next-auth"
import bcrypt from "bcrypt"



declare module "next-auth" {

  interface Session {

    user: {

      id?: number

      name?: string | null

      email?: string | null

      image?: string | null

      phone?: string | null

      password?: string | null

    }

  }

}

interface File{
    path:string;
    size:number;
    uploaderName:string;
    name:string
    userId:number
}

interface Experience{
    company:string;
    position:string;
    description:string;
    startDate:string;
    endDate:string;
    userid:number;
}

interface Education{
    institution:string;
    degree:string;
    startDate:string;
    endDate:string;
    fieldOfStudy:string;
    userid:number;
    grade:string;
}

interface Projects{
    title:string;
    description:string;
    userId:number;
}

interface Skill{
    name:string;
    userId:number;
}

interface Credentials{
    bio :string;
    description:string;
    image:File[]
    experience:Experience[]
    education:Education[]
    projects:Projects[]
    skills:Skill[];
}

export const config={
    api:{
        bodyParser:false
    }
}

const uploadHandler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method === "POST") {
            upload.single('file')(req, res, async (err: any) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
            });

            const file = req.file;
            const credential: Credentials = req.body;

            const session = await getSession({ req });

            if (!session) {
                return res.status(401).json({ error: "You are not authenticated" });
            }

            try {
                const user = await prisma.user.create({
                    data: {
                        name: session.user?.name,
                        email: session.user?.email,
                        number: session.user?.phone,
                        bio: credential.bio,
                        description: credential.description,
                        password:bcrypt,
                        image: {
                            create:credential.image.map(img=>({
                                path: img.path,
                                size: img.size,
                                uploaderName: img.uploaderName,
                                name: img.name,
                                userId: session.user?.id,
                            }))
                        },
                        experience: {
                            create: credential.experience.map(exp => ({
                                company: exp.company,
                                position: exp.position,
                                description: exp.description,
                                startDate: exp.startDate,
                                endDate: exp.endDate,
                                userId: session.user?.id,
                            }))
                        },
                        education: {
                            create: credential.education.map(edu => ({
                                institution: edu.institution,
                                degree: edu.degree,
                                startDate: edu.startDate,
                                endDate: edu.endDate,
                                fieldOfStudy: edu.fieldOfStudy,
                                userId: session.user?.id,
                                grade: edu.grade,
                            }))
                        },
                        projects: {
                            create: credential.projects.map(proj => ({
                                title: proj.title,
                                description: proj.description,
                                userId: session.user?.id,
                            }))
                        },
                        skills: {
                            create: credential.skills.map(skill => ({
                                name: skill.name,
                                userId: session.user?.id,
                            }))
                        }
                    }
                });

                if(user){
                    return "User Created";
                }

                return res.status(200).json(user);
            } catch (err) {
                return res.status(500).json({ "error": "error" });
            }
        }
    };

}
