export default function Footer() {
  return (
    <footer className="bg-dark-footer border-t border-white/10 px-12 py-11 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 flex-wrap">
      <div className="font-playfair font-black text-lg text-offwhite">
        Reach<span className="text-coral italic">.golf</span>
      </div>
      <div className="flex flex-wrap gap-8">
        {[['How it works','#how'],['Who it\'s for','#who'],['Submit a brief','#brief'],['hello@reach.golf','mailto:hello@reach.golf']].map(([label, href]) => (
          <a key={label} href={href} className="text-xs text-offwhite/25 tracking-wider hover:text-offwhite transition-colors">{label}</a>
        ))}
      </div>
      <div className="text-[0.68rem] text-offwhite/20">&copy; 2026 Reach.golf</div>
    </footer>
  )
}
