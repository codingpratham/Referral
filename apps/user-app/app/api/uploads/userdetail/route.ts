import { NextApiRequest, NextApiResponse } from "next"

interface Experience{
    company: String,
    position :String,
    description:String
    startDate:String
    endDate:String
}

interface Education{
    institution: String,
    degree:String,
    startDate:String,
    endDate:String,
    fieldOfStudy:String,
    grade:String,
}

interface Projects{
    title:String,
    description:String,
}

interface Credentials{
    bio:String,
    description:String,
    skills:String[],
}

export default async function handler(req : NextApiRequest , res : NextApiResponse){

    if (req.method=="POST"){
        const credentials : Credentials = req.body as Credentials
        const experience : Experience = req.body.experience as Experience
        const education : Education = req.body.education as Education
        const projects : Projects = req.body.projects as Projects
    }
}