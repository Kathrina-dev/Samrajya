'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with subtle scale animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Desktop video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Lush green forest resort in morning light"
          className="hidden absolute inset-0 w-full h-full object-cover md:block"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Mobile video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Lush green forest resort in morning light"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        >
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#102C23]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content */}
      <div
        className="
          relative z-10 container mx-auto px-6 lg:px-12 h-full
          flex flex-col justify-end
          pb-10 md:pb-0 md:justify-center
          mt-0 md:mt-12
        "
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div
            variants={itemVariants}
            className="overflow-hidden mb-3 md:mb-6"
          >
            <span className="block text-[10px] md:text-sm text-ivory-soft uppercase tracking-[0.3em] font-medium">
              Samrajya Resort
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="
              text-4xl
              md:text-7xl
              lg:text-8xl
              text-ivory-soft
              font-serif
              leading-[1.05]
              md:leading-[1.1]
              mb-6
              md:mb-12
              max-w-[340px]
              md:max-w-4xl
            "
          >
            Where nature <br className="hidden md:block" />
            becomes your escape.
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-6"
          >
            <Link
              href="#experiences"
              className="
                px-6 py-3
                md:px-8 md:py-4
                bg-ivory-soft
                text-forest-deep
                text-[10px] md:text-sm
                uppercase
                tracking-widest
                font-medium
                hover:bg-white
                transition-colors
                duration-300
                text-center
              "
            >
              Explore the Resort
            </Link>

            <Link
              href="#booking"
              className="
                px-6 py-3
                md:px-8 md:py-4
                border
                border-ivory-soft
                text-ivory-soft
                text-[10px] md:text-sm
                uppercase
                tracking-widest
                font-medium
                hover:bg-ivory-soft/10
                transition-colors
                duration-300
                text-center
              "
            >
              Book Your Stay
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        aria-label="Scroll to explore the resort"
        className="
          hidden md:flex
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          z-10
          flex-col
          items-center
          gap-2
          cursor-pointer
          group
        "
      >
        <span className="text-xs text-ivory-soft/70 uppercase tracking-widest group-hover:text-ivory-soft transition-colors">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <ArrowDown
            className="
              w-4 h-4
              text-ivory-soft/70
              group-hover:text-ivory-soft
              transition-colors
            "
          />
        </motion.div>
      </motion.button>
    </section>
  )
}
