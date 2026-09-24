'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const experiences = [
  {
    id: '01',
    title: 'Rain Dance',
    description: 'Turn up the music, step into the rain and let the afternoon unfold.',
    image: '/rain.webp'
  },
  {
    id: '02',
    title: 'Cricket',
    description: 'Gather your people, pick a side and enjoy a game surrounded by the outdoors.',
    image: '/cricket.webp'
  },
  {
    id: '03',
    title: 'Birds',
    description: 'A quieter encounter with the natural life around the resort.',
    image: '/bird.webp'
  },
  {
    id: '04',
    title: 'Outdoor Relaxation',
    description: '[Add description for outdoor seating areas]',
    image: '/relax.webp'
  },
  {
    id: '05',
    title: 'Vruksha Vedika',
    description: 'Under the mango trees. Quiet, shaded, natural, intimate.',
    image: '/vruksha.webp'
  }
]

export default function ExperienceSection() {
  return (
    <section id="experiences" className="py-24 md:py-32 bg-ivory-soft text-forest-deep">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="block text-xs uppercase tracking-[0.2em] font-medium mb-6 text-sage">Experiences</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">Immerse yourself.</h2>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group relative w-full h-[50vh] md:h-[60vh] overflow-hidden cursor-pointer flex flex-col justify-end bg-forest-deep/10"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
                <div className="absolute inset-0 bg-forest-deep/20 mix-blend-multiply transition-colors duration-700 group-hover:bg-forest-deep/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8 transform transition-transform duration-700 ease-out md:translate-y-8 md:group-hover:translate-y-0">
                <div className="max-w-2xl text-ivory-soft">
                  <span className="block text-sm font-serif italic mb-4 opacity-80">{exp.id}</span>
                  <h3 className="text-3xl md:text-4xl font-serif mb-4">{exp.title}</h3>
                  <p className="text-base md:text-lg font-light leading-relaxed opacity-0 md:opacity-0 transition-opacity duration-700 ease-out md:group-hover:opacity-100">
                    {exp.description}
                  </p>
                </div>
                <div className="flex-shrink-0 h-14 w-14 rounded-full border border-ivory-soft/30 flex items-center justify-center text-ivory-soft transition-colors duration-500 group-hover:bg-ivory-soft group-hover:text-forest-deep">
                  <ArrowUpRight className="w-6 h-6 transition-transform duration-500 group-hover:rotate-45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
