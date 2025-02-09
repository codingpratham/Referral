/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "sonner"; // Notifications
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      bio: "",
      description: "",
      experience: [{ company: "", position: "", startDate: new Date(), endDate: new Date(), description: "" }],
      education: [{ institution: "", degree: "", startDate: new Date(), endDate: new Date(), fieldOfStudy: "", grade: "" }],
      projects: [{ title: "", description: "" }],
      skills: [{ name: "" }],
    },
  });

  // Field Arrays for dynamic inputs
  const { fields: expFields, append: addExperience, remove: removeExperience } = useFieldArray({ control, name: "experience" });
  const { fields: eduFields, append: addEducation, remove: removeEducation } = useFieldArray({ control, name: "education" });
  const { fields: projFields, append: addProject, remove: removeProject } = useFieldArray({ control, name: "projects" });
  const { fields: skillFields, append: addSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credentials: data }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to save profile");

      toast.success("Profile saved successfully!");
      reset();
    } catch (error) {
      toast.error("Unable to save profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Card className="w-full max-w-4xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <Input {...register("name", { required: "Name is required" })} placeholder="Full Name" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            {/* Bio */}
            <Textarea {...register("bio", { required: "Bio is required" })} placeholder="Short Bio" />
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}

            {/* Description */}
            <Textarea {...register("description", { required: "Description is required" })} placeholder="Detailed Description" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            {/* Experience Section */}
            <h3 className="text-lg font-semibold">Experience</h3>
            {expFields.map((field, index) => (
              <div key={field.id} className="border p-3 rounded-lg space-y-2">
                <Input {...register(`experience.${index}.company`, { required: "Company name is required" })} placeholder="Company" />
                <Input {...register(`experience.${index}.position`, { required: "Position is required" })} placeholder="Position" />
                <Textarea {...register(`experience.${index}.description`)} placeholder="Job Description" />
                <div className="flex space-x-2">
                  <Controller
                    control={control}
                    name={`experience.${index}.startDate`}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => setValue(`experience.${index}.startDate`, date || new Date())}
                        placeholderText="Start Date"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`experience.${index}.endDate`}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => setValue(`experience.${index}.endDate`, date || new Date())}
                        placeholderText="End Date"
                      />
                    )}
                  />
                </div>
                <Button type="button" variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                  <Trash className="w-4 h-4" /> Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addExperience({ company: "", position: "", startDate: new Date(), endDate: new Date(), description: "" })}>
              <PlusCircle className="w-4 h-4 mr-1" /> Add Experience
            </Button>

            <h3 className="text-lg font-semibold">Education</h3>
{eduFields.map((field, index) => (
  <div key={field.id} className="border p-3 rounded-lg space-y-2">
    {/* Institution Name */}
    <Input
      {...register(`education.${index}.institution`, { required: "Institution name is required" })}
      placeholder="Institution Name"
    />
    
    {/* Degree */}
    <Input
      {...register(`education.${index}.degree`, { required: "Degree is required" })}
      placeholder="Degree"
    />

    {/* Field of Study */}
    <Input
      {...register(`education.${index}.fieldOfStudy`, { required: "Field of study is required" })}
      placeholder="Field of Study"
    />

    {/* Grade */}
    <Input
      {...register(`education.${index}.grade`)}
      placeholder="Grade (Optional)"
    />

    {/* Start Date & End Date */}
    <div className="flex space-x-2">
      <Controller
        control={control}
        name={`education.${index}.startDate`}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => setValue(`education.${index}.startDate`, date || new Date())}
            placeholderText="Start Date"
          />
        )}
      />
      <Controller
        control={control}
        name={`education.${index}.endDate`}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => setValue(`education.${index}.endDate`, date || new Date())}
            placeholderText="End Date"
          />
        )}
      />
    </div>

    {/* Remove Education Entry Button */}
    <Button type="button" variant="destructive" size="sm" onClick={() => removeEducation(index)}>
      <Trash className="w-4 h-4" /> Remove
    </Button>
  </div>
))}

{/* Add New Education Entry Button */}
<Button type="button" variant="outline" size="sm" onClick={() => addEducation({ institution: "", degree: "", fieldOfStudy: "", grade: "", startDate: new Date(), endDate: new Date() })}>
  <PlusCircle className="w-4 h-4 mr-1" /> Add Education
</Button>



            {/* Projects Section */}
            <h3 className="text-lg font-semibold">Projects</h3>
            {projFields.map((field, index) => (
              <div key={field.id} className="border p-3 rounded-lg space-y-2">
                <Input {...register(`projects.${index}.title`, { required: "Project title is required" })} placeholder="Project Title" />
                <Textarea {...register(`projects.${index}.description`)} placeholder="Project Description" />
                <Button type="button" variant="destructive" size="sm" onClick={() => removeProject(index)}>
                  <Trash className="w-4 h-4" /> Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addProject({ title: "", description: "" })}>
              <PlusCircle className="w-4 h-4 mr-1" /> Add Project
            </Button>

            {/* Skills Section */}
            <h3 className="text-lg font-semibold">Skills</h3>
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input {...register(`skills.${index}.name`, { required: "Skill name is required" })} placeholder="Skill" />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addSkill({ name: "" })}>
              <PlusCircle className="w-4 h-4 mr-1" /> Add Skill
            </Button>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
