import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <div>
       {comp.map((comp) => (
              <Card key={comz.id}>
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
  )
}

export default page