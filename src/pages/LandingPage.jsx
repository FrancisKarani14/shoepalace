import HeroSection from '../components/HeroSection'
import Categories from '../components/Categories'
import Latest from '../components/Latest'
import Brands from '../components/Brands'
import Trending from '../components/Trending'

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Categories />
      <Latest />
      <Brands />
      <Trending />
    </div>
  )
}
