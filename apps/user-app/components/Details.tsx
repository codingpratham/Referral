/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Details = () => {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [education, setEducation] = useState({
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    fieldOfStudy: "",
    grade: "",
  });

  const [projects, setProjects] = useState({ title: "", description: "" });
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("description", description);
    formData.append("company", experience.company);
    formData.append("position", experience.position);
    formData.append("startDate", experience.startDate);
    formData.append("endDate", experience.endDate);
    formData.append("experienceDescription", experience.description);
    formData.append("institution", education.institution);
    formData.append("degree", education.degree);
    formData.append("eduStartDate", education.startDate);
    formData.append("eduEndDate", education.endDate);
    formData.append("fieldOfStudy", education.fieldOfStudy);
    formData.append("grade", education.grade);
    formData.append("projectTitle", projects.title);
    formData.append("projectDescription", projects.description);
    formData.append("skills", skills);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
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
        <Input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <h3 className="text-lg font-semibold mt-4">Experience</h3>
        <Input type="text" placeholder="Company" value={experience.company} onChange={(e) => setExperience({ ...experience, company: e.target.value })} />
        <Input type="text" placeholder="Position" value={experience.position} onChange={(e) => setExperience({ ...experience, position: e.target.value })} />
        <Input type="date" placeholder="Start Date" value={experience.startDate} onChange={(e) => setExperience({ ...experience, startDate: e.target.value })} />
        <Input type="date" placeholder="End Date" value={experience.endDate} onChange={(e) => setExperience({ ...experience, endDate: e.target.value })} />
        <Input type="text" placeholder="Description" value={experience.description} onChange={(e) => setExperience({ ...experience, description: e.target.value })} />

        <h3 className="text-lg font-semibold mt-4">Education</h3>
        <Input type="text" placeholder="Institution" value={education.institution} onChange={(e) => setEducation({ ...education, institution: e.target.value })} />
        <Input type="text" placeholder="Degree" value={education.degree} onChange={(e) => setEducation({ ...education, degree: e.target.value })} />
        <Input type="date" placeholder="Start Date" value={education.startDate} onChange={(e) => setEducation({ ...education, startDate: e.target.value })} />
        <Input type="date" placeholder="End Date" value={education.endDate} onChange={(e) => setEducation({ ...education, endDate: e.target.value })} />
        <Input type="text" placeholder="Field of Study" value={education.fieldOfStudy} onChange={(e) => setEducation({ ...education, fieldOfStudy: e.target.value })} />
        <Input type="text" placeholder="Grade" value={education.grade} onChange={(e) => setEducation({ ...education, grade: e.target.value })} />

        <h3 className="text-lg font-semibold mt-4">Projects</h3>
        <Input type="text" placeholder="Title" value={projects.title} onChange={(e) => setProjects({ ...projects, title: e.target.value })} />
        <Input type="text" placeholder="Description" value={projects.description} onChange={(e) => setProjects({ ...projects, description: e.target.value })} />

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
