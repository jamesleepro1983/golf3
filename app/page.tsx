import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import WhatWeDo from '@/components/WhatWeDo'
import HowItWorks from '@/components/HowItWorks'
import WhoItsFor from '@/components/WhoItsFor'
import WhyMicro from '@/components/WhyMicro'
import BriefForm from '@/components/BriefForm'
import Footer from '@/components/Footer'
import NextJsBadge from '@/components/NextJsBadge'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <WhatWeDo />
      <BriefForm />
      <HowItWorks />
      <WhoItsFor />
      <WhyMicro />
      <Footer />
      <NextJsBadge />
    </>
  )
}
