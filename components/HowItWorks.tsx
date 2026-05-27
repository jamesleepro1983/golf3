const steps = [
  { num: '01', title: 'Submit your brief', desc: 'Tell us what you\'re promoting, who you want to reach, and what your budget looks like. Takes about three minutes.', badge: 'Free to submit' },
  { num: '02', title: 'We do the legwork', desc: 'We reach out to our network of vetted golf micro-influencers and find the ones who are the right fit for your campaign.', badge: 'Within 48 hours' },
  { num: '03', title: 'You choose and go', desc: 'We come back with options — audience stats, content examples and clear pricing. You pick who you want. No obligation.', badge: 'No obligation' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="px-12 py-28 border-b border-white/10">
      <p className="flex items-center gap-3 text-coral text-xs font-medium tracking-[0.24em] uppercase mb-8">
        <span className="inline-block w-5 h-px bg-coral" />
        The process
      </p>
      <h2 className="font-playfair font-black leading-tight tracking-tight mb-14" style={{ fontSize: 'clamp(2.2rem,4vw,3.8rem)' }}>
        Three steps.<br /><em className="text-coral">Zero faff.</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10">
        {steps.map((step, i) => (
          <div key={i} className="bg-dark p-10 border-b md:border-b-0 md:border-r border-white/10 last:border-0 hover:bg-[#161616] transition-colors">
            <div className="font-playfair font-black text-6xl text-coral/15 leading-none mb-6 tracking-tight">{step.num}</div>
            <h3 className="font-outfit font-semibold text-lg mb-3">{step.title}</h3>
            <p className="text-offwhite/55 font-light leading-relaxed" style={{ fontSize: '1rem' }}>{step.desc}</p>
            <span className="inline-block mt-6 text-[0.62rem] tracking-[0.16em] uppercase text-coral border border-coral/30 px-3 py-1">{step.badge}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
