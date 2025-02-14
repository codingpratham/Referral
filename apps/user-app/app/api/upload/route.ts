/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const session= await getServerSession(authOptions)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Convert formData to a readable object
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      if(data){
        const user= await prisma.user.create({
          data: {
            bio:data.bio,
            description: data.description,
            userId:session.user.id,
            education: {
              create: {
                institution: data.institution,
                degree: data.degree,
                startDate: data.startDate,
                endDate: data.endDate,
                grade: data.grade,
                fieldOfStudy: data.fieldOfStudy,
                
              },
            },
            experience: {
              create:{
                company: data.company,
                position: data.position,
                startDate: data.startDate,
                endDate: data.endDate,
                description: data.description,
              }
            },
            projects: {
              create: {
                title: data.projectTitle,
                description: data.projectDescription,
              },
            },
            skills:{
              createMany: {
                data: data.skills.split(",").map((skill:any) => ({ name: skill.trim() })),
              },
            }
          },
        })
        if(user){
          return NextResponse.json({
            success: "Details saved successfully",
            statusCode: 200,
          });
        }
      }
      else{
        return NextResponse.json({
          error: "Invalid data",
          statusCode: 400,
        });
      }
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json({
      error: "File upload failed",
      statusCode: 500,
    });
  }
}

export async function DELETE(){
  try {
    await prisma.user.deleteMany({})
  }
  catch (error){
    console.log(error)
  }
}