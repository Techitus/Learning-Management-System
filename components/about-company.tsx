/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, Phone, Mail, Clock } from "lucide-react"

const teamMembers = [
  { name: "John Doe", role: "CEO", avatar: "/avatars/john-doe.jpg" },
  { name: "Jane Smith", role: "CTO", avatar: "/avatars/jane-smith.jpg" },
  { name: "Mike Johnson", role: "COO", avatar: "/avatars/mike-johnson.jpg" },
  { name: "Sarah Brown", role: "CFO", avatar: "/avatars/sarah-brown.jpg" },
  
]

export default function AboutSection() {
  return (
    <div className="container mx-auto ">
      <h1 className="text-4xl font-bold mb-8 text-center">About TechInnovate Solutions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <span>123 Tech Street, Innovation City, TC 12345</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <span>info@techinnovate.com</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Our History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-2">
              <Clock className="h-5 w-5 text-gray-500 mt-1" />
              <p>
                Founded in 2010, TechInnovate Solutions has been at the forefront of technological innovation for over a
                decade. We started as a small startup with a vision to revolutionize the tech industry and have since
                grown into a leading provider of cutting-edge solutions for businesses worldwide.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center">Our Team</CardTitle>
          <CardDescription className="text-center">Meet the people behind TechInnovate Solutions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-8">
            {/* CEO */}
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarImage src={teamMembers[0].avatar} alt={teamMembers[0].name} />
                <AvatarFallback>
                  {teamMembers[0].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold">{teamMembers[0].name}</span>
              <Badge variant="secondary">{teamMembers[0].role}</Badge>
            </div>

            {/* C-level executives */}
            <div className="flex flex-wrap justify-center gap-8">
              {teamMembers.slice(1, 4).map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{member.name}</span>
                  <Badge variant="secondary">{member.role}</Badge>
                </div>
              ))}
            </div>

            {/* Department heads */}
            <div className="flex flex-wrap justify-center gap-8">
              {teamMembers.slice(4).map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{member.name}</span>
                  <Badge variant="secondary">{member.role}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>A Word from Our CEO</CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="italic text-lg text-gray-600 border-l-4 border-gray-300 pl-4">
            "At TechInnovate Solutions, we believe in pushing the boundaries of what's possible. Our team is dedicated
            to creating innovative solutions that not only meet the needs of our clients but also shape the future of
            technology. We're not just building products; we're crafting experiences that transform businesses and
            improve lives."
          </blockquote>
          <p className="mt-4 font-semibold text-right">- John Doe, CEO of TechInnovate Solutions</p>
        </CardContent>
      </Card>
    </div>
  )
}

