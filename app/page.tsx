import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import IntroSection from '@/components/IntroSection'
import RoomsSection from '@/components/RoomsSection'
import ExperienceSection from '@/components/ExperienceSection'
import DiningSection from '@/components/DiningSection'
import CelebrateSection from '@/components/CelebrateSection'
import MeetSection from '@/components/MeetSection'
import GallerySection from '@/components/GallerySection'
import BookingCTA from '@/components/BookingCTA'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <IntroSection />
      <RoomsSection />
      <ExperienceSection />
      <DiningSection />
      <CelebrateSection />
      <MeetSection />
      <GallerySection />
      <BookingCTA />
      <FinalCTA />
      <Footer />
    </main>
  )
}
