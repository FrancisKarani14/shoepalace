import HeroSection from '../components/HeroSection'
import Categories from '../components/Categories'
import Latest from '../components/Latest'
import Brands from '../components/Brands'
import Trending from '../components/Trending'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Brands />
      <Categories />
      <Latest />
      <Trending />
      <Testimonials />
      <ContactSection />
    </div>
  )
}
