"use client";
import  Center  from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput"; 
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin() {
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Sign In Successfully");
        router.push("/dashboard");
      } else {
        toast.error(res?.error || "Something went wrong");
        router.push("/auth/signup")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex-grow"></div>
      <div className="w-full max-w-md">
        <Center>
          <div className="max-w-md w-full bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-xl border border-gray-200">
            <h1 className="text-3xl font-extrabold text-blue-400 text-center mb-4">
              Referral
            </h1>
            <h2 className="text-xl font-semibold text-center mb-4">Log In </h2>
            <div>
              <TextInput
                placeholder="Enter your email"
                onChange={(value: string) => {
                  setEmail(value);
                }}
                type="text"
                label={"Email Address"}
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

            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                type="button"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
            <div className="text-center mt-4">
              <p>Don't have an account?</p>
              <button
                className="text-blue-500 hover:underline focus:outline-none"
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
  );
};