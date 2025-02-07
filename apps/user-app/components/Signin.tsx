"use client"
import { useState } from "react"
import { TextInput } from "@repo/ui/TextInput"
import Center from "@repo/ui/Center"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");

  const [experiences, setExperiences] = useState([
    { company: "", position: "", description: "", startDate: "", endDate: "" },
  ]);
  const [education, setEducation] = useState([
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      fieldOfStudy: "",
      grade: "",
    },
  ]);
  const [projects, setProjects] = useState([{ title: "", description: "" }]);
  const [skills, setSkills] = useState([""]);
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        number: number,
        name: name,
        bio: bio,
        description: description,
        experiences: experiences,
        education: education,
        projects: projects,
        skills: skills,
        isSignup: true,
        redirect: false,
      })

      if (res?.ok) {
        toast("Sign in successfully")
        router.push('/')
      }
      else {
        return "something went wrong"
      }
    } catch (error) {
      console.log(error);

    }
  }
  return <>
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex-grow"></div>
      <div className="w-full max-w-md">
        <Center>
          <div className="max-w-md w-full bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-xl border border-gray-200">
            <h1 className="text-3xl font-extrabold text-black-900 text-center mb-4">
              Referral
            </h1>
            <h2 className="text-xl font-semibold text-center mb-4">Sign in </h2>

            <div>
              <TextInput
                placeholder="Enter your email address"
                onChange={(value: string) => {
                  setEmail(value);
                }}
                type="email"
                label={"Email Address"}
              />
            </div>

            <div>
              <TextInput
                placeholder="Enter your Name"
                onChange={(value: string) => {
                  setName(value);
                }}
                type="text"
                label={"Name"}
              />
            </div>

            <div>
              <TextInput
                placeholder="Enter your phone number"
                onChange={(value: string) => {
                  setNumber(value);
                }}
                type="text"
                label={"Phone Number"}
              />
            </div>

            <div className="mt-0">
              <TextInput
                placeholder="Enter your password"
                onChange={(value: string) => {
                  setPassword(value);
                }}
                type="password"
                label={"Password"}
              />
            </div>

            <div className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-xl mt-10">
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Referral Information
        </h1>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              Tell Us About Yourself
            </h2>
            <Textarea
              placeholder="Enter your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-2 mb-4"
            />
            <Textarea
              placeholder="Enter your Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 mb-4"
            />
          </div>

          {/* Experience Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Experience</h2>
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="space-y-4 mt-4 p-4 border rounded-md shadow-sm"
              >
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    if (newExperiences[index]) {
                      newExperiences[index].company = e.target.value;
                    }
                    setExperiences(newExperiences);
                  }}
                  className="border-gray-300"
                />
                <Input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    if (newExperiences[index]) {
                      newExperiences[index].position = e.target.value;
                    }
                    setExperiences(newExperiences);
                  }}
                  className="border-gray-300"
                />
                <Textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    if (newExperiences[index]) {
                      newExperiences[index].description = e.target.value;
                    }
                    setExperiences(newExperiences);
                  }}
                  className="border-gray-300"
                />
                <Input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    if (newExperiences[index]) {
                      newExperiences[index].startDate = e.target.value;
                    }
                    setExperiences(newExperiences);
                  }}
                  className="border-gray-300"
                />
                <Input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    if (newExperiences[index]) {
                      newExperiences[index].endDate = e.target.value;
                    }
                    setExperiences(newExperiences);
                  }}
                  className="border-gray-300"
                />
                <Button
                  onClick={() => setExperiences(experiences.filter((_, i) => i !== index))}
                >
                  Remove Experience
                </Button>
              </div>
            ))}
            <Button
              onClick={() => setExperiences([...experiences, { company: "", position: "", description: "", startDate: "", endDate: "" }])}
            >
              + Add Experience
            </Button>
          </div>

          {/* Education Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Education</h2>
            {education.map((edu, index) => (
              <div
                key={index}
                className="space-y-4 mt-4 p-4 border rounded-md shadow-sm"
              >
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => {
                    const newEducation = [...education];
                    if (newEducation[index]) {
                      newEducation[index].institution = e.target.value;
                    }
                    setEducation(newEducation);
                  }}
                  className="border-gray-300"
                />
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...education];
                    if (newEducation[index]) {
                      newEducation[index].degree = e.target.value;
                    }
                    setEducation(newEducation);
                  }}
                  className="border-gray-300"
                />
                <Input
                  placeholder="Field of Study"
                  value={edu.fieldOfStudy}
                  onChange={(e) => {
                    const newEducation = [...education];
                    if (newEducation[index]) {
                      newEducation[index].fieldOfStudy = e.target.value;
                    }
                    setEducation(newEducation);
                  }}
                  className="border-gray-300"
                />
                <Input
                  placeholder="Grade"
                  value={edu.grade}
                  onChange={(e) => {
                    const newEducation = [...education];
                    if (newEducation[index]) {
                      newEducation[index].grade = e.target.value;
                    }
                    setEducation(newEducation);
                  }}
                  className="border-gray-300"
                />
                <Input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEducation = [...education];
                    if (newEducation[index]) {
                      newEducation[index].startDate = e.target.value;
                    }
                    setEducation(newEducation);
                  }}
                  className="border-gray-300"
                />
                <Input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) => {
                    const newEducation = [...education];
                    if (newEducation[index]) {
                      newEducation[index].endDate = e.target.value;
                    }
                    setEducation(newEducation);
                  }}
                  className="border-gray-300"
                />
                <Button
                  onClick={() => setEducation(education.filter((_, i) => i !== index))}
                >
                  Remove Education
                </Button>
              </div>
            ))}
            <Button
              onClick={() => setEducation([...education, { institution: "", degree: "", startDate: "", endDate: "", fieldOfStudy: "", grade: "" }])}
            >
              + Add Education
            </Button>
          </div>

          {/* Projects Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Projects</h2>
            {projects.map((project, index) => (
              <div
                key={index}
                className="space-y-4 mt-4 p-4 border rounded-md shadow-sm"
              >
                <Input
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    if (newProjects[index]) {
                      newProjects[index].title = e.target.value;
                    }
                    setProjects(newProjects);
                  }}
                  className="border-gray-300"
                />
                <Textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    if (newProjects[index]) {
                      newProjects[index].description = e.target.value;
                    }
                    setProjects(newProjects);
                  }}
                  className="border-gray-300"
                />
                <Button
                  onClick={() => setProjects(projects.filter((_, i) => i !== index))}
                >
                  Remove Project
                </Button>
              </div>
            ))}
            <Button
              onClick={() => setProjects([...projects, { title: "", description: "" }])}
            >
              + Add Project
            </Button>
          </div>

          {/* Skills Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Skills</h2>
            {skills.map((skill, index) => (
              <div key={index} className="flex space-x-4 mt-4">
                <Input
                  placeholder="Enter a Skill"
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...skills];
                    newSkills[index] = e.target.value;
                    setSkills(newSkills);
                  }}
                  className="border-gray-300"
                />
                <Button
                  onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                >
                  Remove Skill
                </Button>
              </div>
            ))}
            <Button
              onClick={() => setSkills([...skills, ""])}
            >
              + Add Skill
            </Button>
          </div>

          <Button type="submit" className="w-full py-3 mt-8 bg-black text-white rounded-md shadow-md hover:bg-gray-700">
            Submit
          </Button>
        
      </div>

            <div className="mt-6">
              <button
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                type="button"
                onClick={handleLogin}
              >
                Sign In
              </button>

            </div>
            <div className="text-center mt-4">
              <p>Already have an account?</p>
              <button
                className="text-black-900 hover:underline focus:outline-none"
                onClick={() => router.push("/auth/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </Center>
      </div>
      <div className="flex-grow"></div>
    </div>
  </>
}