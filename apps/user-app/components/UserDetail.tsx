"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner"; // Notifications
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash } from "lucide-react";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      bio: "",
      description: "",
      experience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
      educations: [{ institution: "", degree: "", startDate: "", endDate: "", fieldOfStudy: "", grade: "" }],
      projects: [{ title: "", description: "" }],
      skills: [{ name: "" }],
    },
  });

  // Field Arrays for dynamic inputs
  const { fields: expFields, append: addExperience, remove: removeExperience } = useFieldArray({ control, name: "experience" });
  const { fields: eduFields, append: addEducation, remove: removeEducation } = useFieldArray({ control, name: "educations" });
  const { fields: projFields, append: addProject, remove: removeProject } = useFieldArray({ control, name: "projects" });
  const { fields: skillFields, append: addSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data:any) => {
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
      toast("unable to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Card className="w-full max-w-4xl p-6">
        <CardHeader>
          <CardTitle className="text-xl">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <Input {...register("name", { required: "Name is required" })} placeholder="Name" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            {/* Bio */}
            <Textarea {...register("bio", { required: "Bio is required" })} placeholder="Bio" />
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}

            {/* Description */}
            <Textarea {...register("description", { required: "Description is required" })} placeholder="Description" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            {/* Experience Section */}
            <h3 className="font-semibold">Experience</h3>
            {expFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input {...register(`experience.${index}.company`)} placeholder="Company" />
                <Input {...register(`experience.${index}.position`)} placeholder="Position" />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeExperience(index)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addExperience({ company: "", position: "", startDate: "", endDate: "", description: "" })}>
              <PlusCircle className="w-4 h-4 mr-1" /> Add Experience
            </Button>

            {/* Education Section */}
            <h3 className="font-semibold">Education</h3>
            {eduFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input {...register(`educations.${index}.institution`)} placeholder="Institution" />
                <Input {...register(`educations.${index}.degree`)} placeholder="Degree" />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(index)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addEducation({ institution: "", degree: "", startDate: "", endDate: "", fieldOfStudy: "", grade: "" })}>
              <PlusCircle className="w-4 h-4 mr-1" /> Add Education
            </Button>

            {/* Projects Section */}
            <h3 className="font-semibold">Projects</h3>
            {projFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input {...register(`projects.${index}.title`)} placeholder="Project Title" />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeProject(index)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addProject({ title: "", description: "" })}>
              <PlusCircle className="w-4 h-4 mr-1" /> Add Project
            </Button>

            {/* Skills Section */}
            <h3 className="font-semibold">Skills</h3>
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input {...register(`skills.${index}.name`)} placeholder="Skill" />
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
