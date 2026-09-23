'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section id="about" ref={containerRef} className="bg-cream-warm text-forest-deep py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Grid: Reduced mb-24 to mb-12 on mobile screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-12 md:mb-24">
          {/* Left Column: Heading */}
          <motion.div 
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.span 
              variants={fadeUpVariants}
              className="block text-xs uppercase tracking-[0.2em] font-medium mb-8 text-sage"
            >
              The Resort
            </motion.span>
            <motion.h2 
              variants={fadeUpVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1]"
            >
              This is the place.
            </motion.h2>
          </motion.div>

          {/* Right Column: Paragraph */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <p className="text-lg md:text-xl font-light font-sans leading-relaxed mb-8 text-forest-deep/80">
              Arrive at a sanctuary designed to foster deep connection with the earth. From the moment you enter our lobby, every architectural detail and quiet pathway is intentionally crafted to help you leave the noise behind.
            </p>
            <Link 
              href="#gallery"
              className="group inline-flex items-center gap-4 text-sm uppercase tracking-widest font-medium border-b border-forest-deep/20 pb-2 hover:border-forest-deep transition-colors w-fit"
            >
              Explore the Property
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>

        {/* Large Landscape Image: Changed mobile height to h-[35vh] to sit perfectly tight */}
        <motion.div
          className="relative w-full h-[35vh] md:h-[70vh] rounded-none overflow-hidden"
          initial={{ opacity: 0, clipPath: "inset(20% 0 20% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            style={{ y }}
            className="absolute inset-0 w-full h-[100%] -top-[10%]"
          >
            {/* Desktop / Laptop */}
            <Image
              src="/reception.jpg"
              alt="Resort reception and lobby area"
              fill
              className="hidden md:block object-cover"
              sizes="100vw"
            />

            {/* Mobile: Changed object-contain to object-cover to prevent blank top/bottom margins */}
            <Image
              src="/reception2.jpg"
              alt="Resort reception and lobby area"
              fill
              className="block md:hidden object-cover"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
