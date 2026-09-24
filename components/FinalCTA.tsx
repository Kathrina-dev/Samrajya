'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">

      {/* Background with Zoom Effect on Scroll */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      >

        {/* Desktop */}
        <Image
          src="/dusk.webp"
          alt="Resort pathway at dusk"
          fill
          className="hidden md:block object-cover"
          sizes="100vw"
          priority
        />

        {/* Mobile */}
        <Image
          src="/dusk-mobile.webp"
          alt="Resort pathway at dusk"
          fill
          className="block md:hidden object-cover"
          sizes="100vw"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-forest-dark/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-ivory-soft mb-6 leading-[1.1]">
            Come away for a while.
          </h2>

          <Link
            href="/booking"
            className="inline-block px-10 py-5 mt-8 bg-ivory-soft text-forest-deep text-sm uppercase tracking-widest font-medium hover:bg-white transition-colors duration-300"
          >
            Book Your Stay
          </Link>
        </motion.div>
      </div>
    </section>
  )
}