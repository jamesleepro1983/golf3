export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.png')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/10 via-dark/20 to-dark/95" />

      {/* Content */}
      <div className="relative z-10 px-12 pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-end max-w-7xl">
        <div>
          <p className="flex items-center gap-3 text-coral text-xs font-medium tracking-[0.28em] uppercase mb-5">
            <span className="inline-block w-7 h-px bg-coral" />
            Golf Influencer Matchmaking
          </p>
          <h1 className="font-playfair font-black text-offwhite leading-none tracking-tight" style={{ fontSize: 'clamp(3rem,7vw,6.5rem)' }}>
            The right creators.<br />
            <em className="text-coral">For your game.</em>
          </h1>
        </div>
        <div className="flex flex-col items-start md:items-end gap-5 text-left md:text-right">
          <p className="text-offwhite/65 font-light leading-relaxed max-w-xs" style={{ fontSize: '1rem' }}>
            Golf clubs, venues and brands connected with micro-influencers their audience already trusts.
          </p>
          <a
            href="#brief"
            className="inline-block text-xs font-semibold tracking-widest uppercase bg-coral text-dark px-8 py-4 hover:bg-coral-light transition-colors whitespace-nowrap"
          >
            Submit your brief
          </a>
          <span className="text-offwhite/35 text-xs tracking-wider">Free &mdash; back to you in 48 hours</span>
        </div>
      </div>
    </section>
  )
}
