"use client"

import Center from "@repo/ui/Center"
import { useState } from "react"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"

export async function Uploads(){
    const [bio,setBio]= useState("")
    const [description,setdescription]= useState("")
    const [company,setCompany]= useState("")
    const [position,setPosition]= useState("")
    const [exdescription,setExDescription]= useState("")
    const [exStartDate,setExStartDate]= useState("")
    const [endDate,setEndDate]= useState("")
    const [institution,setInstitution]= useState("")
    const [degree,setDegree]= useState("")
    const [edStartDate,setEdStartDate]= useState("")
    const [edEndDate,setEdEndDate]= useState("")
    const [fieldOfStudy,setFieldOfStudy]= useState("")
    const [grade,setGrade]= useState("")
    const [proTitle,setProTitle]= useState("")
    const [proDescription,setProDescription]= useState("")
    const [skillName,setSkillName]= useState("")

    return(
        <>
        <Center>
            
            <Textarea 
            placeholder="Enter your Bio"
            
            />
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Textarea/>
            <Button>Submit</Button>

        </Center>
        </>
    )

}