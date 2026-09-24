'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BookingCTA() {
  return (
    <section id="booking" className="py-24 bg-forest-deep text-ivory-soft">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Your stay begins here.</h2>
          <p className="text-ivory-soft/80 font-light max-w-lg mx-auto mb-12">
            Send us a booking enquiry and our reservations team will get back to you with availability and further details.
          </p>

          <Link
            href="/booking"
            className="inline-block px-12 py-5 bg-ivory-soft text-forest-deep text-sm uppercase tracking-widest font-medium hover:bg-white hover:text-forest-dark transition-colors duration-300"
          >
            Make an Enquiry
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
