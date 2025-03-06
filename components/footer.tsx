import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Learnify</h2>
          <p className="text-sm text-muted-foreground">Empowering learning platform that enables you to explore diverse courses, master new skills, and grow at your own pace. From beginner to expert, we help unlock your full potential anytime, anywhere.</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/allcourses" className="text-muted-foreground transition-colors hover:text-primary">
                 Courses
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Mentors
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Go to the top
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4 hidden xl:block">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Learnify, All rights reserved.
        </p>
      </div>
    </footer>
  )
}

