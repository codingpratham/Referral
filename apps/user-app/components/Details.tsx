"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Details = () => {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [experience, setExperience] = useState([
    { company: "", position: "", startDate: "", endDate: "", description: "" },
  ]);

  const [education, setEducation] = useState([
    { institution: "", degree: "", startDate: "", endDate: "", fieldOfStudy: "", grade: "" },
  ]);

  const [projects, setProjects] = useState([{ title: "", description: "" }]);
  const [skills, setSkills] = useState("");

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const payload = {
      bio,
      name,  // Changed from "description" to "name"
      experience,
      education,
      projects,
      skills,
    };

    console.log(payload);
    
  
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Set correct content type
        },
        body: JSON.stringify(payload),  // Send JSON directly
      });
  
      const data = await res.json();
      console.log("Response:", data);
  
      if (res.ok) {
        alert("Profile created successfully!");
        router.push("/");
      } else {
        throw new Error("Failed to create profile");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Profile Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

        <h3 className="text-lg font-semibold mt-4">Experience</h3>
        {experience.map((exp, index) => (
          <div key={index} className="space-y-2 border p-2">
            <Input type="text" placeholder="Company" value={exp.company} onChange={(e) => {
              const updatedExperience = [...experience];
              if(updatedExperience[index])
              updatedExperience[index].company = e.target.value;
              setExperience(updatedExperience);
            }} />
            <Input type="text" placeholder="Position" value={exp.position} onChange={(e) => {
              const updatedExperience = [...experience];
              if(updatedExperience[index])
              updatedExperience[index].position = e.target.value;
              setExperience(updatedExperience);
            }} />
            <Input type="date" placeholder="Start Date" value={exp.startDate} onChange={(e) => {
              const updatedExperience = [...experience];
              if(updatedExperience[index])
              updatedExperience[index].startDate = e.target.value;
              setExperience(updatedExperience);
            }} />
            <Input type="date" placeholder="End Date" value={exp.endDate} onChange={(e) => {
              const updatedExperience = [...experience];
              if(updatedExperience[index])
              updatedExperience[index].endDate = e.target.value;
              setExperience(updatedExperience);
            }} />
            <Input type="text" placeholder="Description" value={exp.description} onChange={(e) => {
              const updatedExperience = [...experience];
              if(updatedExperience[index])
              updatedExperience[index].description = e.target.value;
              setExperience(updatedExperience);
            }} />
          </div>
        ))}
        <Button type="button" onClick={() => {
          setExperience([...experience, { company: "", position: "", startDate: "", endDate: "", description: "" }]);
        }}>
          Add Experience
        </Button>

        <h3 className="text-lg font-semibold mt-4">Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="space-y-2 border p-2">
            <Input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => {
              const updatedEducation = [...education];
              if(updatedEducation[index])
              updatedEducation[index].institution = e.target.value;
              setEducation(updatedEducation);
            }} />
            <Input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => {
              const updatedEducation = [...education];
              if(updatedEducation[index])
              updatedEducation[index].degree = e.target.value;
              setEducation(updatedEducation);
            }} />
            <Input type="date" placeholder="Start Date" value={edu.startDate} onChange={(e) => {
              const updatedEducation = [...education];
              if(updatedEducation[index])
              updatedEducation[index].startDate = e.target.value;
              setEducation(updatedEducation);
            }} />
            <Input type="date" placeholder="End Date" value={edu.endDate} onChange={(e) => {
              const updatedEducation = [...education];
              if(updatedEducation[index])
              updatedEducation[index].endDate = e.target.value;
              setEducation(updatedEducation);
            }} />
            <Input type="text" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => {
              const updatedEducation = [...education];
              if(updatedEducation[index])
              updatedEducation[index].fieldOfStudy = e.target.value;
              setEducation(updatedEducation);
            }} />
            <Input type="text" placeholder="Grade" value={edu.grade} onChange={(e) => {
              const updatedEducation = [...education];
              if(updatedEducation[index])
              updatedEducation[index].grade = e.target.value;
              setEducation(updatedEducation);
            }} />
          </div>
        ))}
        <Button type="button" onClick={() => {
          setEducation([...education, { institution: "", degree: "", startDate: "", endDate: "", fieldOfStudy: "", grade: "" }]);
        }}>
          Add Education
        </Button>

        <h3 className="text-lg font-semibold mt-4">Projects</h3>
        {projects.map((proj, index) => (
          <div key={index} className="space-y-2 border p-2">
            <Input type="text" placeholder="Title" value={proj.title} onChange={(e) => {
              const updatedProjects = [...projects];
              if(updatedProjects[index])
              updatedProjects[index].title = e.target.value;
              setProjects(updatedProjects);
            }} />
            <Input type="text" placeholder="Description" value={proj.description} onChange={(e) => {
              const updatedProjects = [...projects];
              if(updatedProjects[index])
              updatedProjects[index].description = e.target.value;
              setProjects(updatedProjects);
            }} />
          </div>
        ))}
        <Button type="button" onClick={() => {
          setProjects([...projects, { title: "", description: "" }]);
        }}>
          Add Project
        </Button>

        <h3 className="text-lg font-semibold mt-4">Skills</h3>
        <Input type="text" placeholder="Enter skills (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} />

        <Button type="submit" className="mt-4">
          Save Details
        </Button>
      </form>
    </div>
  );
};

export default Details;
