import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="bg-primary text-primary-foreground py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Job with Raferral</h1>
        <p className="text-xl mb-8">Discover thousands of job opportunities with all the information you need.</p>
        <div className="max-w-3xl mx-auto flex gap-4">
          <Input type="text" placeholder="Job title, keywords, or company" className="flex-grow" />
          <Input type="text" placeholder="City or state" className="flex-grow" />
          <Button size="lg">Search Jobs</Button>
        </div>
      </div>
    </div>
  )
}

