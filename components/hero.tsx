import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-6 py-20 text-center md:py-28">
      <div className="space-y-4 px-4">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-transparent text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Unlock New Horizons of Learning with
          <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-gray-400">
            Learnify
          </span>
        </h1>
        <p className="mx-auto max-w-[42rem] text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed sm:leading-8">
          Empowering learning platform that enables you to explore diverse courses, master new skills, and grow at your own pace. From beginner to expert, we help unlock your full potential anytime, anywhere.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center px-4">
        <Link href="/allcourses">
          <Button size="lg" className="w-full sm:w-auto">
            Explore Courses
            <ArrowRight className="ml-2 h-4 w-5" />
          </Button>
        </Link>
        <Link href="/allcourses">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Book Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
