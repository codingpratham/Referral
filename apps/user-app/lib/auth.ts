/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials: any):Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (credentials.isSignup) {
          if (existingUser) {
            throw new Error("Email already exists");
          }

          // Hash password and create new user
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          try {
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword,
              },
            });

            return { id: newUser.id, email: newUser.email };
          } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
          }
        }

        // Handle login (sign-in)
        if (!existingUser || !existingUser.password) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return { id: existingUser.id, email: existingUser.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  pages:{
    signIn:"/auth/signin",
  },
  callbacks: {
    async session({ session, token }: any) {
      if(session.user){
        session.user.id=token.sub
      }
      return session;
  },
  async jwt({token , user}:any){

    if(user){
      token.sub=user.id
    }
    return token;
  }
}
};
