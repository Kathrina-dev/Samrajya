'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function MeetSection() {
  return (
    <section id="meet" className="py-24 md:py-32 bg-background text-forest-deep overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left: Content */}
        <motion.div 
          className="order-2 lg:order-1 flex flex-col justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="block text-xs uppercase tracking-[0.2em] font-medium mb-6 text-sage">Meet</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-8">
            The Board Room
          </h2>
          <p className="text-lg text-forest-deep/80 font-light leading-relaxed max-w-lg">
            A focused setting for meetings, discussions and private gatherings.
          </p>
        </motion.div>

        {/* Right: Image */}
        <motion.div 
          className="order-1 lg:order-2 relative w-full aspect-[4/3] overflow-hidden bg-forest-deep/10"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/meeting.webp"
            alt="The Board Room"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

      </div>
    </section>
  )
}
