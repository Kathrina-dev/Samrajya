'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const wellnessFeatures = [
  'Spa & Massage',
  'Guided Meditation',
  'Morning Yoga',
  'Nature Therapy'
]

export default function WellnessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef as any,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section id="wellness" ref={containerRef} className="py-24 md:py-32 bg-forest-deep text-ivory-soft overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left: Image with Parallax */}
        <motion.div 
          className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <Image
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
              alt="Relaxing spa setting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 mix-blend-multiply" />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-ivory-soft opacity-80 tracking-widest text-center leading-[1.2]">
              REST.<br/>BREATHE.<br/>RESET.
            </h3>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span className="block text-xs uppercase tracking-[0.2em] font-medium mb-6 text-sand">Wellness</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-8">
            Wellness, surrounded by nature.
          </h2>
          <p className="text-lg text-ivory-soft/80 font-light leading-relaxed mb-12 max-w-lg">
            Our wellness philosophy is rooted in the healing power of the natural world. From mineral-rich mud baths to open-air yoga, every experience is designed to restore balance and calm.
          </p>
          
          <ul className="flex flex-col gap-6">
            {wellnessFeatures.map((feature, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1), ease: "easeOut" }}
                className="flex items-center gap-4 text-sm uppercase tracking-widest font-medium border-b border-ivory-soft/10 pb-4"
              >
                <span className="text-sand">0{idx + 1}</span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  )
}
