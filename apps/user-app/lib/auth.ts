/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@repo/db/client"
import bcrypt from "bcrypt"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        image:{label: "Image", type: "image", placeholder: "Enter your the image"},
        name: { label: "Name", type: "text", placeholder: "Enter your name" },
        phone: { label: "Phone", type: "tel", placeholder: "Enter your phone number" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
        bio: { label: "Bio", type: "text", placeholder: "Short bio" },
        description: { label: "Description", type: "text", placeholder: "Describe yourself" },
        experiences: { label: "Experiences", type: "text" },
        education: { label: "Education", type: "text" },
        projects: { label: "Projects", type: "text" },
        skills: { label: "Skills", type: "text" },
        isSignup: { label: "Sign Up", type: "hidden" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        // **Signup Flow**
        if (credentials.isSignup) {
          if (existingUser) {
            throw new Error("Email already exists")
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10)

          try {
            const newUser = await prisma.user.create({
              data: {
                name: credentials.name,
                email: credentials.email,
                number: credentials.phone,
                password: hashedPassword,
                bio: credentials.bio || "",
                description: credentials.description || "",
                image:{
                  create: (credentials.image)({
                    
                  })
                },
                experience: {
                  create: JSON.parse(credentials.experiences).map((exp: any) => ({
                    company: exp.company,
                    position: exp.position,
                    startDate: exp.startDate,
                    endDate: exp.endDate,
                    description: exp.description,
                  })),
                },
                education: {
                  create: JSON.parse(credentials.education).map((edu: any) => ({
                    institution: edu.institution,
                    degree: edu.degree,
                    startDate: edu.startDate,
                    endDate: edu.endDate,
                    fieldOfStudy: edu.fieldOfStudy,
                    grade: edu.grade,
                  })),
                },
                projects: {
                  create: JSON.parse(credentials.projects).map((proj: any) => ({
                    title: proj.title,
                    description: proj.description,
                  })),
                },
                skills: {
                  create: JSON.parse(credentials.skills).map((skill: any) => ({
                    name: skill,
                  })),
                },
              },
            })

            return {
              id: newUser.id.toString(),
              name: newUser.name,
              email: newUser.email,
              message: "Signup successful",
            }
          } catch (error) {
            console.error("Error creating user:", error)
            throw new Error("Error creating user")
          }
        }

        // **Login Flow**
        if (!existingUser) {
          throw new Error("User not found")
        }

        const passwordValid = await bcrypt.compare(credentials.password, existingUser.password)
        if (!passwordValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: existingUser.id.toString(),
          name: existingUser.name,
          email: existingUser.email,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub
      return session
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}