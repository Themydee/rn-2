import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'


const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <OurPolicy />
      <NewsLetter />
    </div>
  )
}

export default Home