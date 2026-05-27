'use client'
import { useState } from 'react'

type Track = 'club' | 'brand' | null

const clubPromoteGroups = [
  { label: 'Green fees & playing', items: ['Green fees','Twilight golf','Society days','Golf breaks / stay & play','Competitions & events'] },
  { label: 'Membership', items: ['Full membership','Flexible / pay monthly','Intermediate / junior','Corporate membership','Social membership'] },
  { label: 'Tuition & facilities', items: ['Lessons / tuition','Junior golf programme','Ladies golf','Driving range','Golf simulator','Custom fitting'] },
  { label: 'Venue & hospitality', items: ['Pro shop / retail','Clubhouse / restaurant','Corporate golf days','Function / event hire','General awareness'] },
]

const brandContentTypes = ['Product review','Unboxing','On course demo','Lifestyle post','Custom fitting feature','Giveaway','Tutorial / how to','Long-term ambassador']
const golferTypes = ['Beginner','Mid handicap','Low handicap','Ladies','Junior','Senior']
const platforms = ['Instagram','TikTok','YouTube','Facebook','Any / open']

function SectionTag({ children }: { children: string }) {
  return <p className="text-[0.62rem] tracking-[0.18em] uppercase text-offwhite/30 mb-3 block">{children}</p>
}

function PillGroup({ items, selected, onToggle }: { items: string[], selected: string[], onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-7">
      {items.map(item => (
        <button
          key={item}
          type="button"
          onClick={() => onToggle(item)}
          className={`px-4 py-2 text-sm font-light border transition-all ${
            selected.includes(item)
              ? 'border-coral text-coral bg-coral/8'
              : 'border-white/10 text-offwhite/45 hover:border-coral/40 hover:text-offwhite'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-[0.62rem] tracking-[0.18em] uppercase text-offwhite/35 mb-2">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full bg-transparent border-b border-white/10 pb-2 pt-1 text-base text-offwhite font-light placeholder-offwhite/20 focus:outline-none focus:border-coral transition-colors"
const selectCls = "w-full bg-transparent border-b border-white/10 pb-2 pt-1 text-base text-offwhite/70 font-light focus:outline-none focus:border-coral transition-colors appearance-none cursor-pointer"

export default function BriefForm() {
  const [track, setTrack] = useState<Track>(null)
  const [step, setStep] = useState(0)
  const [clubItems, setClubItems] = useState<string[]>([])
  const [contentTypes, setContentTypes] = useState<string[]>([])
  const [golfers, setGolfers] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  const totalSteps = 4
  const progress = step === 0 ? 0 : Math.round((step / totalSteps) * 100)

  function toggleItem(arr: string[], setArr: (v: string[]) => void, val: string) {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  function next() {
    if (step === 0 && !track) { alert('Please select whether you are a golf club or a brand.'); return }
    setStep(s => s + 1)
  }
  function back() { setStep(s => s - 1) }

  const StepTag = ({ n, label }: { n: number, label: string }) => (
    <div className="mb-6">
      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-coral font-medium block mb-1">Step {n} of 4 · {label}</span>
    </div>
  )

  return (
    <section id="brief" className="px-12 py-28">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-28 items-start mb-14 pb-14 border-b border-white/10">
        <div>
          <p className="flex items-center gap-3 text-coral text-xs font-medium tracking-[0.24em] uppercase mb-6">
            <span className="inline-block w-5 h-px bg-coral" />
            Get started
          </p>
          <h2 className="font-playfair font-black leading-tight tracking-tight" style={{ fontSize: 'clamp(2.2rem,4vw,3.8rem)' }}>
            Submit your<br /><em className="text-coral">brief.</em>
          </h2>
        </div>
        <p className="text-offwhite/55 font-light leading-[1.9] pt-2" style={{ fontSize: '1.05rem' }}>
          Fill in the form below and we&apos;ll come back within 48 hours with a curated shortlist — complete with audience data and clear pricing. No obligation. No upfront fees.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-1 h-px bg-white/10">
        <div className="h-full bg-coral transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-[0.65rem] tracking-[0.18em] uppercase text-offwhite/30 mb-12">
        {step > 0 && step < totalSteps ? `Step ${step} of ${totalSteps}` : '\u00a0'}
      </p>

      {/* Step 0: Track select */}
      {step === 0 && (
        <div>
          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-coral font-medium block mb-2">First things first</span>
          <h3 className="font-playfair font-black leading-tight tracking-tight mb-2" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
            I am a <em className="text-offwhite/40">golf...</em>
          </h3>
          <p className="text-offwhite/45 font-light leading-relaxed mb-8 text-base">Select which best describes you — the form adapts from here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 max-w-2xl">
            {[
              { val: 'club' as Track, title: 'Club / Venue', sub: 'Promoting your course, facilities or membership' },
              { val: 'brand' as Track, title: 'Brand / Product', sub: 'Promoting equipment, apparel or a service' },
            ].map(opt => (
              <button
                key={opt.val!}
                onClick={() => setTrack(opt.val)}
                className={`p-6 text-left border transition-all ${
                  track === opt.val ? 'border-coral bg-coral/6' : 'border-white/10 hover:border-coral/40'
                }`}
              >
                <div className="text-sm font-medium text-offwhite mb-1">{opt.title}</div>
                <div className="text-sm text-offwhite/40 font-light leading-snug">{opt.sub}</div>
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={next} className="text-xs font-semibold tracking-widest uppercase bg-coral text-dark px-8 py-4 hover:bg-coral-light transition-colors">
              Continue &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Contact */}
      {step === 1 && (
        <div className="max-w-2xl">
          <StepTag n={1} label="About you" />
          <h3 className="font-playfair font-black leading-tight tracking-tight mb-2" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
            Your <em className="text-offwhite/40">details.</em>
          </h3>
          <p className="text-offwhite/45 font-light mb-8 text-base">So we know who to send your influencer options to.</p>
          <Field label="Your name *"><input type="text" placeholder="James Smith" className={inputCls} /></Field>
          <div className="grid grid-cols-2 gap-8">
            <Field label="Email *"><input type="email" placeholder="james@yourclub.co.uk" className={inputCls} /></Field>
            <Field label="Phone"><input type="tel" placeholder="+44 7700 900000" className={inputCls} /></Field>
          </div>
          <Field label={track === 'club' ? 'Club name *' : 'Brand / company name *'}>
            <input type="text" placeholder={track === 'club' ? 'e.g. Sunningdale Golf Club' : 'e.g. Acme Golf Co.'} className={inputCls} />
          </Field>
          <Field label="Location"><input type="text" placeholder="Town / County" className={inputCls} /></Field>
          <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
            <button onClick={back} className="text-xs tracking-widest uppercase text-offwhite/30 hover:text-offwhite transition-colors">&larr; Back</button>
            <button onClick={next} className="text-xs font-semibold tracking-widest uppercase bg-coral text-dark px-8 py-4 hover:bg-coral-light transition-colors">Continue &rarr;</button>
          </div>
        </div>
      )}

      {/* Step 2a: Club */}
      {step === 2 && track === 'club' && (
        <div className="max-w-3xl">
          <StepTag n={2} label="What to promote" />
          <h3 className="font-playfair font-black leading-tight tracking-tight mb-2" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
            What are you <em className="text-offwhite/40">promoting?</em>
          </h3>
          <p className="text-offwhite/45 font-light mb-8 text-base">Select everything that applies — we use this to match you with the right creators.</p>
          {clubPromoteGroups.map(group => (
            <div key={group.label}>
              <SectionTag>{group.label}</SectionTag>
              <PillGroup items={group.items} selected={clubItems} onToggle={v => toggleItem(clubItems, setClubItems, v)} />
            </div>
          ))}
          <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
            <button onClick={back} className="text-xs tracking-widest uppercase text-offwhite/30 hover:text-offwhite transition-colors">&larr; Back</button>
            <button onClick={next} className="text-xs font-semibold tracking-widest uppercase bg-coral text-dark px-8 py-4 hover:bg-coral-light transition-colors">Continue &rarr;</button>
          </div>
        </div>
      )}

      {/* Step 2b: Brand */}
      {step === 2 && track === 'brand' && (
        <div className="max-w-3xl">
          <StepTag n={2} label="Your product" />
          <h3 className="font-playfair font-black leading-tight tracking-tight mb-2" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
            What are you <em className="text-offwhite/40">promoting?</em>
          </h3>
          <p className="text-offwhite/45 font-light mb-8 text-base">Tell us about your product and the type of content you&apos;re looking for.</p>
          <Field label="Product or service *">
            <input type="text" placeholder="e.g. New irons range, GPS watch, polo shirt collection..." className={inputCls} />
          </Field>
          <SectionTag>Content type</SectionTag>
          <PillGroup items={brandContentTypes} selected={contentTypes} onToggle={v => toggleItem(contentTypes, setContentTypes, v)} />
          <SectionTag>Target golfer</SectionTag>
          <PillGroup items={golferTypes} selected={golfers} onToggle={v => toggleItem(golfers, setGolfers, v)} />
          <Field label="Can you send product to the influencer?">
            <select className={selectCls}>
              <option value="">Select an option</option>
              <option>Yes — happy to send product</option>
              <option>Yes — digital / service</option>
              <option>No — paid partnership only</option>
              <option>Open to discussion</option>
            </select>
          </Field>
          <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
            <button onClick={back} className="text-xs tracking-widest uppercase text-offwhite/30 hover:text-offwhite transition-colors">&larr; Back</button>
            <button onClick={next} className="text-xs font-semibold tracking-widest uppercase bg-coral text-dark px-8 py-4 hover:bg-coral-light transition-colors">Continue &rarr;</button>
          </div>
        </div>
      )}

      {/* Step 3: Campaign */}
      {step === 3 && (
        <div className="max-w-2xl">
          <StepTag n={3} label="Campaign details" />
          <h3 className="font-playfair font-black leading-tight tracking-tight mb-2" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
            Budget &amp; <em className="text-offwhite/40">timing.</em>
          </h3>
          <p className="text-offwhite/45 font-light mb-8 text-base">Help us find influencers at the right price point for your campaign.</p>
          <SectionTag>Preferred platform</SectionTag>
          <PillGroup items={platforms} selected={selectedPlatforms} onToggle={v => toggleItem(selectedPlatforms, setSelectedPlatforms, v)} />
          <div className="grid grid-cols-2 gap-8">
            <Field label="Budget range">
              <select className={selectCls}>
                <option value="">Select</option>
                <option>Under £150</option><option>£150 – £300</option><option>£300 – £600</option>
                <option>£600 – £1,000</option><option>£1,000 – £2,500</option><option>£2,500+</option>
                <option>Not sure — need guidance</option>
              </select>
            </Field>
            <Field label="Timeline">
              <select className={selectCls}>
                <option value="">Select</option>
                <option>ASAP</option><option>Within 2 weeks</option><option>Within a month</option>
                <option>1–3 months</option><option>Planning ahead</option>
              </select>
            </Field>
            <Field label="Geographic reach">
              <select className={selectCls}>
                <option value="">Select</option>
                <option>Local (within 20 miles)</option><option>Regional</option>
                <option>National (UK wide)</option><option>International</option><option>Doesn&apos;t matter</option>
              </select>
            </Field>
            <Field label="Number of influencers">
              <select className={selectCls}>
                <option value="">Select</option>
                <option>Just 1</option><option>2–3</option><option>4–6</option><option>6+</option><option>Not sure</option>
              </select>
            </Field>
          </div>
          <Field label="Anything else we should know?">
            <textarea placeholder="Any specific ideas, requirements, or questions..." rows={3}
              className="w-full bg-transparent border-b border-white/10 pb-2 pt-1 text-base text-offwhite font-light placeholder-offwhite/20 focus:outline-none focus:border-coral transition-colors resize-none leading-relaxed" />
          </Field>
          <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
            <button onClick={back} className="text-xs tracking-widest uppercase text-offwhite/30 hover:text-offwhite transition-colors">&larr; Back</button>
            <button onClick={next} className="text-xs font-semibold tracking-widest uppercase bg-coral text-dark px-8 py-4 hover:bg-coral-light transition-colors">Send my brief &rarr;</button>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="py-16">
          <span className="text-[0.65rem] tracking-[0.22em] uppercase text-coral font-medium block mb-4">You&apos;re all set</span>
          <h3 className="font-playfair font-black leading-none tracking-tight mb-5" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Brief<br />received.
          </h3>
          <p className="text-offwhite/45 font-light leading-[1.85] max-w-sm" style={{ fontSize: '1rem' }}>
            We&apos;ll be in touch within 48 hours with a curated shortlist of golf influencers — complete with audience stats and clear pricing. Keep an eye on your inbox.
          </p>
        </div>
      )}
    </section>
  )
}
