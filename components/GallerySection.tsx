'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const galleryCategories = [
  {
    title: 'The Property',
    images: [
      { id: 'p1', src: '/property.jpg', alt: 'Property view 1', className: 'col-span-12 md:col-span-7 h-[50vh]' },
      { id: 'p2', src: '/seating.JPG', alt: 'Property view 2', className: 'col-span-12 md:col-span-5 h-[50vh]' },
    ]
  },
  {
    title: 'Stay',
    images: [
      { id: 's1', src: '/bed.JPG', alt: 'Stay view 1', className: 'col-span-12 md:col-span-5 h-[60vh]' },
      { id: 's2', src: '/bath.JPG', alt: 'Stay view 2', className: 'col-span-12 md:col-span-7 h-[60vh]' },
    ]
  },
  {
    title: 'Dining',
    images: [
      { id: 'd1', src: '/dining-hall.JPG', alt: 'Dining view 1', className: 'col-span-12 md:col-span-6 h-[50vh]' },
      { id: 'd2', src: '/dining-hall-2.JPG', alt: 'Dining view 2', className: 'col-span-12 md:col-span-6 h-[50vh]' },
    ]
  },
  {
    title: 'Experiences & Celebrations',
    images: [
      { id: 'e1', src: '/stage.JPG', alt: 'Experience view 1', className: 'col-span-12 md:col-span-8 h-[60vh]' },
      { id: 'e2', src: '/cricket.png', alt: 'Celebration view 1', className: 'col-span-12 md:col-span-4 h-[60vh]' },
    ]
  }
]

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-ivory-soft">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="mb-16 md:mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-forest-deep mb-4">
            A glimpse of stillness.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24">
          {galleryCategories.map((category, catIndex) => (
            <div key={category.title}>
              <motion.h3 
                className="text-xs uppercase tracking-[0.2em] font-medium mb-8 text-sage"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                {category.title}
              </motion.h3>
              
              <div className="grid grid-cols-12 gap-4 md:gap-6">
                {category.images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className={`relative overflow-hidden group bg-forest-deep/10 ${image.className}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: "easeOut" }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-forest-deep/0 transition-colors duration-700 ease-out group-hover:bg-forest-deep/10" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
