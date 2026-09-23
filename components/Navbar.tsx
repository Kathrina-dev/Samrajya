'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Stay', href: '#stay' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Dining', href: '#dining' },
    { name: 'Celebrations', href: '#celebrations' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 lg:px-12 py-6 flex items-center justify-between ${
          isScrolled 
            ? 'bg-ivory-soft/95 backdrop-blur-md text-forest-deep shadow-sm py-4' 
            : 'bg-transparent text-ivory-soft py-6'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif tracking-widest z-50">
          SAMRAJYA
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="relative group overflow-hidden"
            >
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
              <span className="block absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-6 z-50">
          <Link 
            href="#booking"
            className={`hidden lg:block text-xs uppercase tracking-widest px-6 py-3 border transition-colors duration-300 ${
              isScrolled 
                ? 'border-forest-deep text-forest-deep hover:bg-forest-deep hover:text-ivory-soft'
                : 'border-ivory-soft text-ivory-soft hover:bg-ivory-soft hover:text-forest-deep'
            }`}
          >
            Book Your Stay
          </Link>
          
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled || isMobileMenuOpen ? 'text-forest-deep' : 'text-ivory-soft'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-forest-deep' : 'text-ivory-soft'}`} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-ivory-soft text-forest-deep flex flex-col justify-center items-center px-6"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-serif tracking-wide"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="w-full mt-8"
              >
                <Link 
                  href="#booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center text-sm uppercase tracking-widest px-6 py-4 bg-forest-deep text-ivory-soft border border-forest-deep"
                >
                  Book Your Stay
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
