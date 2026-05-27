const items = ['Golf Clubs', 'Brands', 'Pro Shops', 'Micro-Influencers', 'Real Golfers', 'Authentic Content', 'No Agency Fees', '48hr Turnaround']

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="bg-coral py-3 overflow-hidden whitespace-nowrap">
      <div className="inline-flex ticker-animate">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-dark text-xs font-semibold tracking-[0.18em] uppercase px-8">{item}</span>
            <span className="text-dark/30">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
