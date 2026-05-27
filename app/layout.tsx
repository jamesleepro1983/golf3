import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Reach.golf — Golf Influencer Matchmaking',
  description: 'Connect your golf club or brand with the right micro-influencers. Submit a brief, we do the legwork, you choose.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${outfit.variable} bg-dark text-offwhite font-outfit overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
