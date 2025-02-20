"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Appbar } from "@repo/ui/Appbar"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
  const session = useSession()
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Referral
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
              Find Jobs
            </Link>
            <Link href="/companies" className="text-gray-600 hover:text-gray-900">
              Companies
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-gray-900">
              Resources
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
          <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>
          </div>
        </div>
      </div>
    </header>
  )
}

