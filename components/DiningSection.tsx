'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const diningSpaces = [
  {
    name: 'The Restaurant',
    description:
      'A welcoming dining space where good food, relaxed moments and the natural character of the resort come together around the table.',
    image: '/resto.webp',
  },
  {
    name: 'Prakruti',
    description:
      'An expressive dining setting surrounded by the spirit of the resort, created for unhurried meals and memorable moments.',
    image: '/dining.webp',
  },
  {
    name: 'Vruksha Vedika',
    description:
      'A distinctive outdoor setting beneath the mango trees, bringing dining closer to nature in a peaceful and intimate atmosphere.',
    image: '/outdoor-dining.webp',
  }
]

export default function DiningSection() {
  return (
    <section id="dining" className="py-24 md:py-32 bg-cream-warm text-forest-deep">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="block text-xs uppercase tracking-[0.2em] font-medium mb-6 text-sage">Dining</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            From the table to the landscape.
          </h2>
          <p className="text-lg text-forest-deep/80 font-light">
            [Add brief description of the overall dining philosophy]
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {diningSpaces.map((space, index) => (
            <motion.div
              key={space.name}
              className="group cursor-pointer flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-forest-deep/10">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-serif mb-3">{space.name}</h3>
              <p className="text-forest-deep/80 font-light leading-relaxed">
                {space.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
