/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session= await getServerSession(authOptions)
    if(!session.user){
      return NextResponse.json({
        error: "Unauthorized",
        statusCode: 401,
      });
    } 

    const formData = await req.formData();
  
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
            userId: session.user.id,
          }
        })
        const education= await prisma.education.create({
          data: {
            institution: data.institution,
                degree: data.degree,
                startDate: data.startDate,
                endDate: data.endDate,
                grade: data.grade,
                fieldOfStudy: data.fieldOfStudy,
                userId: session.user.id,
    
          }
        })

        const experience= await prisma.experience.create({
          data:{
            company: data.company,
            position: data.position,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description,
            userId: session.user.id,
          }
        })
        const projects= await prisma.projects.create({
          data: {
            title: data.projectTitle,
            description: data.projectDescription,
            userId: session.user.id,
          }
        })
        const skills = await prisma.skill.createMany({
          data: {
            name: data.skills.split(",").map((skill:any) => skill.trim()),
            userId: session.user.id,
          }
        })
        if(user && experience && education && projects && skills){
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