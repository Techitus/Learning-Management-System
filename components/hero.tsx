import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className=" bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
        Unlock New Horizons of Learning with 
        <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-gray-400">
  Learnify
</span>        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Empowering learning platform that enables you to explore diverse courses, master new skills, and grow at your own pace. From beginner to expert, we help unlock your full potential anytime, anywhere.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/allcourses">
        <Button size="lg">
          Explore Courses
          <ArrowRight className="ml-2 h-4 w-10" />
        </Button>
        </Link>
        <Link href="/allcourses">
        <Button variant="outline" size="lg">
          Book Now
        </Button>
        </Link>
      </div>
    </section>
  )
}

