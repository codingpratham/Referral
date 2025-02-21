import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "../../../components/Footer"

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$80,000 - $120,000",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    location: "New York, NY",
    type: "Contract",
    salary: "$70,000 - $100,000",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $140,000",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "InnovateCo",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$100,000 - $150,000",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudSys",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$95,000 - $130,000",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "GrowthMarketing",
    location: "Chicago, IL",
    type: "Part-time",
    salary: "$50,000 - $70,000",
  },
]

export default function JobsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Find Your Next Job</h1>
          <div className="mb-8 flex gap-4">
            <Input type="text" placeholder="Job title, keywords, or company" className="flex-grow" />
            <Input type="text" placeholder="City or state" className="flex-grow" />
            <Button size="lg">Search Jobs</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-gray-600 mb-2">{job.location}</p>
                  <Badge>{job.type}</Badge>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-primary font-semibold">{job.salary}</span>
                  <Button variant="outline">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

