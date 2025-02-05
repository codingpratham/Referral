import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
]

export default function FeaturedJobs() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </section>
  )
}

