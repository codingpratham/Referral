/* eslint-disable turbo/no-undeclared-env-vars */
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from '@repo/db/client'
import bcrypt from "bcrypt"

export const authOptions={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                    placeholder:"Enter your email"
                },
                name:{
                    label:"Name",
                    type:"text",
                    placeholder:"Enter your name"   
                },
                phone:{
                    label:"Number",
                    type:"tel",
                    placeholder:"Enter your phone number"
                },
                password:{
                    label:"Password",
                    type:"password",
                    placeholder:"Enter your password"
                }
            },
            async authorize(credentials:any):Promise<any>{
                if(!credentials?.email || !credentials?.password) throw new Error("credentials are required")

                const hashedPassword = await bcrypt.hash(credentials.password,10)

                const existingUser= await prisma.user.findFirst({
                    where:{
                        email:credentials.email
                    }
                })

                if(existingUser && credentials.isSignup){
                    throw new Error("Email already exists")
                }

                if (existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)

                    if(passwordValidation){
                        return{
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.email,
                        }
                    }
                    throw new Error("Invalid credentials")
                }

                try {
                    const user = await prisma.user.create({
                        data:{
                            name:credentials.name,
                            email:credentials.email,
                            number:credentials.phone,
                            password:hashedPassword,
                        }
                    })

                    return{
                        id:user.id.toString(),
                        name:user.name,
                        email:user.email,
                    }
                } catch (error) {
                    console.log(error);

                }
            }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET || "",
    callbacks:{
        async session({token,session}:any){
            session.user.id= token.sub
            return session
        },
        async jwt({token, user}:any){
            if(user){
                token.sub=user.id
            }
            return token
        }
    },
    pages:{
        signIn:'/auth/signin',
    }
}