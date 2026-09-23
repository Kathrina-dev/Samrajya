'use client'

import { motion } from 'framer-motion'

export default function BookingCTA() {
  return (
    <section id="booking" className="py-24 bg-forest-deep text-ivory-soft">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Your stay begins here.</h2>
            <p className="text-ivory-soft/80 font-light max-w-lg mx-auto">
              Select your dates to discover available sanctuaries and experiences for your stay.
            </p>
          </div>

          <form className="bg-forest-dark/50 p-6 md:p-8 border border-ivory-soft/10 flex flex-col lg:flex-row gap-6">
            {/* Check In */}
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="checkin" className="text-xs uppercase tracking-widest text-ivory-soft/60 px-2">Check-in</label>
              <input 
                type="date" 
                id="checkin"
                className="w-full bg-ivory-soft text-forest-deep px-4 py-4 focus:outline-none focus:ring-1 focus:ring-sage transition-all"
                required
              />
            </div>
            
            {/* Check Out */}
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="checkout" className="text-xs uppercase tracking-widest text-ivory-soft/60 px-2">Check-out</label>
              <input 
                type="date" 
                id="checkout"
                className="w-full bg-ivory-soft text-forest-deep px-4 py-4 focus:outline-none focus:ring-1 focus:ring-sage transition-all"
                required
              />
            </div>

            {/* Guests */}
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="guests" className="text-xs uppercase tracking-widest text-ivory-soft/60 px-2">Guests</label>
              <select 
                id="guests"
                className="w-full bg-ivory-soft text-forest-deep px-4 py-4 appearance-none focus:outline-none focus:ring-1 focus:ring-sage transition-all cursor-pointer rounded-none"
              >
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>

            {/* Submit */}
            <div className="flex-1 flex flex-col justify-end pt-2">
              <button 
                type="button"
                className="w-full h-[56px] bg-ivory-soft text-forest-deep text-sm uppercase tracking-widest font-medium hover:bg-white hover:text-forest-dark transition-colors duration-300"
              >
                Check Availability
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
