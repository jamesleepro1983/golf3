const stats = [
  { num: '60%', label: 'Higher engagement vs macro-influencers' },
  { num: '3×', label: 'More likely to drive a purchase decision' },
  { num: '£150', label: 'Typical starting price per campaign' },
  { num: '48hr', label: 'From brief to shortlist in your inbox' },
]

export default function WhyMicro() {
  return (
    <section className="px-12 py-28 border-b border-white/10">
      <p className="flex items-center gap-3 text-coral text-xs font-medium tracking-[0.24em] uppercase mb-8">
        <span className="inline-block w-5 h-px bg-coral" />
        Why micro-influencers
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="font-playfair font-black leading-tight tracking-tight mb-5" style={{ fontSize: 'clamp(2rem,3.5vw,3.2rem)' }}>
            Smaller audience.<br /><em className="text-coral">Bigger impact.</em>
          </h2>
          <p className="text-offwhite/60 font-light leading-[1.9] mb-4" style={{ fontSize: '1.05rem' }}>
            Micro-influencers consistently outperform bigger accounts on the metrics that actually matter. Their audiences trust them, engage with them, and act on their recommendations in ways that celebrity endorsements simply don&apos;t deliver.
          </p>
          <p className="text-offwhite/60 font-light leading-[1.9]" style={{ fontSize: '1.05rem' }}>
            For golf, this is even more true. A local golfer with 8,000 followers talking about your club carries more weight than a sponsored post from a Tour pro.
          </p>
        </div>
        <div className="grid grid-cols-2 border border-white/10">
          {stats.map((s, i) => (
            <div key={i} className="bg-dark p-8 border-b border-r border-white/10 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0 [&:nth-child(4)]:border-r-0">
              <div className="font-playfair font-black text-coral leading-none tracking-tight mb-2" style={{ fontSize: '2.8rem' }}>{s.num}</div>
              <div className="text-offwhite/50 font-light leading-snug" style={{ fontSize: '0.85rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
