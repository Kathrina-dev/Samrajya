import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-ivory-soft pt-24 pb-12 border-t border-ivory-soft/10">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Link href="/" className="text-3xl font-serif tracking-widest">SAMRAJYA</Link>
            <p className="text-ivory-soft/70 font-light max-w-sm">
              Subscribe to our journal for quiet reflections, seasonal recipes, and exclusive retreat offers.
            </p>
            <form className="flex max-w-md border-b border-ivory-soft/30 pb-2 focus-within:border-ivory-soft transition-colors">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent w-full focus:outline-none text-sm placeholder:text-ivory-soft/40"
              />
              <button type="button" className="text-xs uppercase tracking-widest font-medium hover:text-sand transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7 flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-sage mb-2">Explore</h4>
            <Link href="#rooms" className="text-sm font-light hover:text-sand transition-colors w-fit">Stay</Link>
            <Link href="#experiences" className="text-sm font-light hover:text-sand transition-colors w-fit">Experiences</Link>
            <Link href="#dining" className="text-sm font-light hover:text-sand transition-colors w-fit">Dining</Link>
            <Link href="#wellness" className="text-sm font-light hover:text-sand transition-colors w-fit">Wellness</Link>
            <Link href="#gallery" className="text-sm font-light hover:text-sand transition-colors w-fit">Gallery</Link>
          </div>

          {/* Contact & Location */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-sage mb-2">Contact</h4>
            <a href="mailto:hello@samrajyaresort.com" className="text-sm font-light hover:text-sand transition-colors w-fit">hello@samrajyaresort.com</a>
            <a href="tel:+12345678900" className="text-sm font-light hover:text-sand transition-colors w-fit">+1 234 567 8900</a>
            
            <h4 className="text-xs uppercase tracking-widest text-sage mb-2 mt-4">Location</h4>
            <p className="text-sm font-light text-ivory-soft/80">
              100 Quiet Valley Road<br />
              Highlands, Earth 90210
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-ivory-soft/10 text-xs text-ivory-soft/50 font-light">
          <p>© {new Date().getFullYear()} Samrajya Resort. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-ivory-soft transition-colors" aria-label="Instagram">Instagram</a>
            <a href="#" className="hover:text-ivory-soft transition-colors" aria-label="Twitter">Twitter</a>
            <a href="#" className="hover:text-ivory-soft transition-colors" aria-label="Facebook">Facebook</a>
          </div>

          <div className="flex gap-4">
            <Link href="#" className="hover:text-ivory-soft transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-ivory-soft transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
