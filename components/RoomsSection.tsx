'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const accommodations = [
  {
    id: 'cowboy-villa',
    name: 'Cowboy Villa',
    description:
      'A distinctive stay designed for guests looking for a private escape with character, comfort and a sense of adventure.',
    image: '/cowboy.webp',
  },
  {
    id: 'wooden-villa',
    name: 'Wooden Villa',
    description:
      'A warm and inviting retreat where natural textures and a peaceful setting create an easy connection with the outdoors.',
    image: '/wooden.webp',
  },
  {
    id: 'jungle-villa',
    name: 'Jungle Villa',
    description:
      'A nature-inspired retreat surrounded by greenery, offering a quiet setting to slow down and reconnect with the landscape.',
    image: '/jungle.webp',
  },
  {
    id: 'bali-villa',
    name: 'Bali Villa',
    description:
      'A relaxed tropical-inspired retreat that brings together an inviting atmosphere, thoughtful design and the tranquillity of the resort.',
    image: '/bali.webp',
  },
  {
    id: 'hotel-rooms',
    name: 'Hotel Rooms',
    description:
      'Comfortable and thoughtfully designed rooms offering a peaceful place to unwind after a day spent exploring the resort.',
    image: '/room.webp',
  },
  {
    id: 'suite-rooms',
    name: 'Suite Rooms',
    description:
      'A more spacious retreat for guests seeking an elevated stay, with a calm atmosphere designed for lingering and unwinding.',
    image: '/suite.webp',
  },
]

const imageVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export default function RoomsSection() {
  return (
    <section
      id="stay"
      className="relative overflow-hidden bg-background text-forest-deep py-28 md:py-40"
    >
      <div className="container mx-auto px-6 lg:px-12">

        {/* ------------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------------ */}

        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <div>
            <span className="block text-xs uppercase tracking-[0.25em] font-medium mb-6 text-sage">
              Stay
            </span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[0.95]">
              Rest in
              <br />
              <span className="italic">nature.</span>
            </h2>
          </div>

          <button className="group flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-medium border-b border-forest-deep/30 pb-3 hover:border-forest-deep transition-colors w-fit">
            View All Accommodations

            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
          </button>
        </motion.div>


        {/* ------------------------------------------------ */}
        {/* COLLAGE */}
        {/* ------------------------------------------------ */}

        <div className="relative">

          {/* ============================================== */}
          {/* ROW 1 */}
          {/* ============================================== */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">

            {/* Cowboy Villa */}
            <motion.div
              className="md:col-span-7 md:mt-0 group"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <div className="relative aspect-[4/5] md:aspect-[4/3] overflow-hidden">
                <Image
                  src="/cowboy.webp"
                  alt="Cowboy Villa"
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />

                {/* subtle overlay */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-700" />
              </div>

              <div className="mt-5 flex justify-between items-start gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-sage">
                    Villa
                  </span>

                  <h3 className="text-3xl md:text-4xl font-serif mt-2">
                    Cowboy Villa
                  </h3>
                </div>

                <span className="text-xs text-forest-deep/40 pt-2">
                  01
                </span>
              </div>
            </motion.div>


            {/* Small Intro Text */}
            <motion.div
              className="md:col-span-5 md:pt-28 md:px-8 lg:px-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <span className="block w-10 h-px bg-sage mb-8" />

              <p className="text-lg md:text-xl font-serif leading-relaxed text-forest-deep/80">
                Spaces designed to slow the pace, breathe a little deeper,
                and experience the quiet character of the resort.
              </p>

              <p className="mt-6 text-sm leading-relaxed text-forest-deep/60 max-w-sm">
                From distinctive villas to comfortable rooms and suites,
                discover a collection of stays surrounded by nature.
              </p>
            </motion.div>

          </div>


          {/* ============================================== */}
          {/* ROW 2 — OFFSET IMAGES */}
          {/* ============================================== */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mt-20 md:mt-32 items-start">

            {/* Wooden Villa */}
            <motion.div
              className="md:col-span-4 md:col-start-2 group"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/wooden.webp"
                  alt="Wooden Villa"
                  fill
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>

              <div className="mt-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-sage">
                  02
                </span>

                <h3 className="text-2xl md:text-3xl font-serif mt-2">
                  Wooden Villa
                </h3>

                <p className="text-sm text-forest-deep/60 leading-relaxed mt-3 max-w-sm">
                  {accommodations[1].description}
                </p>
              </div>
            </motion.div>


            {/* Jungle Villa */}
            <motion.div
              className="md:col-span-5 md:col-start-8 md:mt-24 group"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/jungle.webp"
                  alt="Jungle Villa"
                  fill
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>

              <div className="mt-5 flex justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-sage">
                    03
                  </span>

                  <h3 className="text-3xl font-serif mt-2">
                    Jungle Villa
                  </h3>
                </div>
              </div>
            </motion.div>

          </div>


          {/* ============================================== */}
          {/* ROW 3 */}
          {/* ============================================== */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mt-20 md:mt-40 items-start">

            {/* Bali Villa */}
            <motion.div
              className="md:col-span-6 md:col-start-1 group"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/bali.webp"
                  alt="Bali Villa"
                  fill
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="mt-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-sage">
                  04
                </span>

                <h3 className="text-3xl md:text-4xl font-serif mt-2">
                  Bali Villa
                </h3>
              </div>
            </motion.div>


            {/* Hotel Rooms */}
            <motion.div
              className="md:col-span-4 md:col-start-8 md:mt-32 group"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/room.webp"
                  alt="Hotel Rooms"
                  fill
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>

              <div className="mt-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-sage">
                  05
                </span>

                <h3 className="text-2xl md:text-3xl font-serif mt-2">
                  Hotel Rooms
                </h3>

                <p className="text-sm text-forest-deep/60 leading-relaxed mt-3">
                  {accommodations[4].description}
                </p>
              </div>
            </motion.div>

          </div>


          {/* ============================================== */}
          {/* ROW 4 — FINAL IMAGE */}
          {/* ============================================== */}

          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mt-20 md:mt-32"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >

            {/* Empty space */}
            <div className="hidden md:block md:col-span-3" />

            {/* Suite */}
            <div className="md:col-span-6 group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/suite.webp"
                  alt="Suite Rooms"
                  fill
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-sage">
                    06
                  </span>

                  <h3 className="text-3xl md:text-4xl font-serif mt-2">
                    Suite Rooms
                  </h3>
                </div>

                <ArrowRight className="w-5 h-5 text-forest-deep/40" />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}