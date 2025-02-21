"use client"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"

export default function DashboardPage() {
  
  const {data :session} = useSession()

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Welcome to {
            session?.user?.email || "User"
            }</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">12</p>
                <p className="text-gray-600">Total applications</p>
                <Button className="mt-4">View Applications</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">5</p>
                <p className="text-gray-600">Jobs saved</p>
                <Button className="mt-4">View Saved Jobs</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">75%</p>
                <p className="text-gray-600">Complete your profile</p>
                <Button className="mt-4">Edit Profile</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

