const clubTags = ['Green Fees','Membership','Society Days','Events','Pro Shop','Golf Breaks','Simulator','Tuition','Corporate Days']
const brandTags = ['Equipment','Apparel','Accessories','Golf Tech','Reviews','Unboxing','On Course','Giveaways','Ambassador']

export default function WhoItsFor() {
  return (
    <section id="who" className="px-12 py-28 border-b border-white/10 bg-dark-section">
      <p className="flex items-center gap-3 text-coral text-xs font-medium tracking-[0.24em] uppercase mb-8">
        <span className="inline-block w-5 h-px bg-coral" />
        Who it&apos;s for
      </p>
      <h2 className="font-playfair font-black leading-tight tracking-tight mb-12" style={{ fontSize: 'clamp(2.2rem,4vw,3.8rem)' }}>
        Golf clubs &amp;<br /><em className="text-coral">golf brands.</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10">
        {[
          { title: 'Clubs & Venues', desc: 'Drive green fee bookings, grow your membership, fill your society diary, or put your facilities on the map. We find creators whose audience is made up of exactly the golfers you want walking through your gates.', tags: clubTags },
          { title: 'Brands & Products', desc: 'Get your product in front of real, engaged golfers through creators who genuinely use and love gear like yours. Equipment, apparel, tech, accessories — we find the right voice for your brand.', tags: brandTags },
        ].map((card, i) => (
          <div key={i} className="bg-dark-section p-11 border-b md:border-b-0 md:border-r border-white/10 last:border-0 hover:bg-[#161616] transition-colors">
            <h3 className="font-playfair font-bold text-2xl tracking-tight mb-3">{card.title}</h3>
            <p className="text-offwhite/55 font-light leading-[1.85] mb-8" style={{ fontSize: '1rem' }}>{card.desc}</p>
            <div className="flex flex-wrap gap-2">
              {card.tags.map(tag => (
                <span key={tag} className="text-[0.67rem] tracking-wider px-3 py-1 border border-white/10 text-offwhite/35">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
