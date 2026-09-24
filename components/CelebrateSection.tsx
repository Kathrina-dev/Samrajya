'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const eventSpaces = [
  {
    name: 'Poolside',
    description:
      'From intimate ceremonies to vibrant celebrations, the poolside creates a beautiful setting where the occasion becomes part of the landscape.',
    image: '/pool.webp',
  },
  {
    name: 'Main Hall / Banquet',
    description:
      'A versatile setting for gatherings, celebrations and special occasions, designed to bring people together in an elegant environment.',
    image: '/hall.webp',
  },
  {
    name: 'Amrapali',
    description:
      'A dedicated gathering space within the resort, offering an inviting setting for celebrations, occasions and shared moments.',
    image: '/lobby.webp',
  },
  {
    name: 'Mehendi Room',
    description:
      'A dedicated space for intimate celebrations and traditional ceremonies, providing a comfortable setting for meaningful moments.',
    image: '/salon.webp',
  }
]

export default function CelebrateSection() {
  return (
    <section id="celebrations" className="py-24 md:py-32 bg-forest-deep text-ivory-soft overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <span className="block text-xs uppercase tracking-[0.2em] font-medium mb-6 text-sand">Celebrate</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">Gather beautifully.</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {eventSpaces.map((space, index) => (
            <motion.div
              key={space.name}
              className="group cursor-pointer flex flex-col"
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 bg-ivory-soft/10">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif mb-3">{space.name}</h3>
              <p className="text-ivory-soft/80 font-light leading-relaxed max-w-lg">
                {space.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
