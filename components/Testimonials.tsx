'use client'

import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section className="py-32 md:py-48 bg-cream-warm text-forest-deep flex items-center justify-center">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.3] mb-12">
            "The kind of place where you stop checking the time. A quietly powerful escape."
          </blockquote>
          
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-sm uppercase tracking-[0.2em] font-medium">Maya & Thomas R.</span>
            <span className="text-xs text-forest-deep/60 tracking-widest uppercase">London, UK</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
