'use client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-6 transition-all duration-300 ${
      scrolled ? 'bg-dark/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <a href="#" className="font-playfair font-black text-xl tracking-tight text-offwhite">
        Reach<span className="text-coral italic">.golf</span>
      </a>
      <div className="hidden md:flex items-center gap-10">
        <a href="#how" className="text-xs font-medium tracking-widest uppercase text-offwhite/60 hover:text-offwhite transition-colors">How it works</a>
        <a href="#who" className="text-xs font-medium tracking-widest uppercase text-offwhite/60 hover:text-offwhite transition-colors">Who it&apos;s for</a>
        <a href="#brief" className="text-xs font-semibold tracking-widest uppercase bg-coral text-dark px-6 py-3 hover:bg-coral-light transition-colors">
          Submit a brief
        </a>
      </div>
      <a href="#brief" className="md:hidden text-xs font-semibold tracking-widest uppercase bg-coral text-dark px-4 py-2">
        Brief
      </a>
    </nav>
  )
}
