export default function WhatWeDo() {
  return (
    <section className="px-12 py-28 border-b border-white/10">
      <p className="flex items-center gap-3 text-coral text-xs font-medium tracking-[0.24em] uppercase mb-10">
        <span className="inline-block w-5 h-px bg-coral" />
        What we do
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="font-playfair font-black leading-tight tracking-tight" style={{ fontSize: 'clamp(2.2rem,4vw,3.8rem)' }}>
            Influencer matchmaking.<br />
            <em className="text-coral">Built for golf.</em>
          </h2>
          <div className="flex gap-2 mt-8">
            <span className="text-xs font-medium tracking-widest uppercase px-4 py-2 border border-coral text-coral">Golf</span>
            <span className="text-xs font-medium tracking-widest uppercase px-4 py-2 border border-white/15 text-offwhite/40">Padel — soon</span>
          </div>
        </div>
        <div className="space-y-5">
          <p className="text-offwhite/65 font-light leading-[1.9]" style={{ fontSize: '1.05rem' }}>
            Most influencer platforms are built for beauty and fashion. Reach.golf is built for the golf world — the clubs, the brands, and the creators who actually play the game.
          </p>
          <p className="text-offwhite/65 font-light leading-[1.9]" style={{ fontSize: '1.05rem' }}>
            Submit your brief and we&apos;ll come back with a curated shortlist of micro-influencers whose audiences match exactly the golfer you want to reach. No cold DMs. No wasted budget. Just the right fit.
          </p>
        </div>
      </div>
    </section>
  )
}
