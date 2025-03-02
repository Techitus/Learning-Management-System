import { GraduationCap, Earth, Activity, CircleHelp } from "lucide-react";

const features = [
  {
    name: "Experience Mentors",
    description:
      "Gain valuable insights and personalized guidance from experienced mentors, helping you navigate your learning journey with expert support and real-world expertise.",
    icon: GraduationCap,
  },
  {
    name: "Flexible Learning",
    description:
      "Learn from industry experts anytime, anywhere, and at your own pace with a flexible learning experience.",
    icon: Earth,
  },
  {
    name: "Experiential Learning",
    description:
      "Engage in immersive, experiential learning that allows you to develop practical skills and gain real-world experience, all while learning at your own pace and from the comfort of your own space.",
    icon: Activity,
  },
  {
    name: "Interactive Q&A Sessions",
    description:
      "Expand your knowledge and enhance your comprehension by participating in interactive question-and-answer sessions with experts.",
    icon: CircleHelp,
  },
];

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          The Learning Experience We Offer
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Explore our diverse offerings, including expert courses, flexible learning, and personalized mentorship. We help you unlock your full potential and achieve your learning goals.
        </p>
      </div>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold text-lg">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
