"use client"

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Details = () => {
    const [bio,setBio]=useState("")
    const [description,setDescription]=useState("")
    const [experience,setExperience]=useState({
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
    })

    const addExperience = () => {
        setExperience({
            company:"",
            position:"",
            start_date:"",
            end_date:"",
            description:"",
        })
    }
    
    return (
        <div>
            <Input 
            type="text"
            placeholder="Bio"
            onChange={(e)=>{
                setBio(e.target.value)
            }}
            />

            <Input
            type="text"
            placeholder="Description"
            onChange={(e)=>{
                setDescription(e.target.value)
            }}
            />

            Experience

            <Input
            type="text"
            placeholder="Company"
            onChange={(e)=>{
             setExperience({...experience,company:e.target.value})
            }}
            />
            <Input
            type="text"
            placeholder="Position"
            onChange={(e)=>{
                setExperience({...experience,position:e.target.value})
            }
            }/>
            <Input
            type="text"
            placeholder="Start Date"
            onChange={(e)=>{
                setExperience({...experience,start_date:e.target.value})
            }}/>
            <Input
            type="text"
            placeholder="End Date"
            onChange={(e)=>{
                setExperience({...experience,end_date:e.target.value})
            }}/>
            <Input
            type="text"
            placeholder="Description"
            onChange={(e)=>{
                setExperience({...experience,description:e.target.value})
            }}
            />
            <Button 
            onClick={(e)=>{
                addExperience()
            }}
            >Add</Button>

        </div>
    );
}

export default Details;