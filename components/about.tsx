/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import React from 'react'
import about from '@/Images/about.webp'
const About = () => {
  return (
    <section className="py-16 ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={about}
                alt="About Our Company" 
                fill
                className="object-cover"
              />
            </div>
            
           
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">About Our Company</h2>
              <div className="w-20 h-1 bg-primary"></div>
              <p className="text-muted-foreground">
                Founded in 2020, our company has been at the forefront of innovation in our industry. 
                We believe in creating solutions that not only meet but exceed our clients' expectations.
              </p>
              <p className="text-muted-foreground">
                Our team of dedicated professionals brings together decades of experience and a passion 
                for excellence. We're committed to sustainable practices and giving back to the communities 
                we serve.

              </p>
              <div className="pt-4">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default About