"use client"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Referral</h3>
            <p className="text-gray-600">Find your dream job with ease.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/browse-jobs" className="text-gray-600 hover:text-gray-900">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/career-advice" className="text-gray-600 hover:text-gray-900">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link href="/resume-help" className="text-gray-600 hover:text-gray-900">
                  Resume Help
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/post-job" className="text-gray-600 hover:text-gray-900">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-gray-900">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; 2025 Referral. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

