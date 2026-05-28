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
  return <p className="text-[0.62rem] tracking-[0.2em] uppercase text-dark/55 mb-3 block">{children}</p>
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
              ? 'border-coral text-coral bg-coral/10'
              : 'border-dark/15 text-dark/70 hover:border-coral hover:text-dark'
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
    <div className="mb-6">
      <label className="block text-[0.62rem] tracking-[0.2em] uppercase text-dark/60 mb-2">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full bg-white border border-dark/15 rounded-sm px-4 py-3 text-base text-dark font-light placeholder-dark/35 focus:outline-none focus:border-coral transition-colors"
const selectCls = "w-full bg-white border border-dark/15 rounded-sm px-4 py-3 text-base text-dark/85 font-light focus:outline-none focus:border-coral transition-colors appearance-none cursor-pointer"

export default function BriefForm() {
  const [track, setTrack] = useState<Track>(null)
  const [step, setStep] = useState(0)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')

  const [clubItems, setClubItems] = useState<string[]>([])

  const [productService, setProductService] = useState('')
  const [contentTypes, setContentTypes] = useState<string[]>([])
  const [golfers, setGolfers] = useState<string[]>([])
  const [sendProduct, setSendProduct] = useState('')

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [geoReach, setGeoReach] = useState('')
  const [numInfluencers, setNumInfluencers] = useState('')
  const [notes, setNotes] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const totalSteps = 4
  const progress = step === 0 ? 0 : Math.round((step / totalSteps) * 100)

  function toggleItem(arr: string[], setArr: (v: string[]) => void, val: string) {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  function next() {
    if (step === 0 && !track) { alert('Please select whether you are a golf club or a brand.'); return }
    if (step === 1) {
      if (!name.trim() || !email.trim() || !company.trim()) {
        alert('Please fill in your name, email and ' + (track === 'club' ? 'club' : 'brand') + ' name.')
        return
      }
    }
    if (step === 2 && track === 'brand' && !productService.trim()) {
      alert('Please tell us what product or service you’re promoting.')
      return
    }
    setStep(s => s + 1)
  }
  function back() { setStep(s => s - 1) }

  async function submitBrief() {
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    if (!accessKey) {
      setSubmitError('Form is not configured yet. Please contact us at hello@jamesleedesign.co.uk.')
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    const payload: Record<string, string> = {
      access_key: accessKey,
      subject: `New brief: ${company || name} (${track === 'club' ? 'Club / Venue' : 'Brand / Product'})`,
      from_name: name || 'Reach.golf brief',
      email,
      'I am a': track === 'club' ? 'Golf club / venue' : 'Golf brand / product',
      Name: name,
      Email: email,
      Phone: phone,
      [track === 'club' ? 'Club' : 'Brand']: company,
      Location: location,
      ...(track === 'club'
        ? { 'Promoting': clubItems.join(', ') || '—' }
        : {
            'Product / service': productService,
            'Content type': contentTypes.join(', ') || '—',
            'Target golfer': golfers.join(', ') || '—',
            'Can send product?': sendProduct || '—',
          }
      ),
      'Preferred platform': selectedPlatforms.join(', ') || '—',
      'Budget': budget || '—',
      'Timeline': timeline || '—',
      'Geographic reach': geoReach || '—',
      'Number of influencers': numInfluencers || '—',
      'Notes': notes || '—',
      botcheck: '',
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setStep(4)
      } else {
        setSubmitError(data.message || 'Something went wrong sending your brief. Please try again or email hello@jamesleedesign.co.uk.')
      }
    } catch {
      setSubmitError('Couldn’t reach the server. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const StepTag = ({ n, label }: { n: number, label: string }) => (
    <div className="mb-6">
      <span className="text-[0.65rem] tracking-[0.22em] uppercase text-coral font-medium block mb-1">Step {n} of 4 · {label}</span>
    </div>
  )

  const navBtnBack = "text-xs tracking-widest uppercase text-dark/55 hover:text-dark transition-colors disabled:opacity-50"
  const navBtnNext = "text-xs font-semibold tracking-widest uppercase bg-coral text-offwhite px-8 py-4 hover:bg-coral-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

  return (
    <section id="brief" className="px-6 md:px-12 pt-14 md:pt-16 pb-24 md:pb-28">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28 items-start mb-10">
        <div>
          <p className="flex items-center gap-3 text-coral text-xs font-medium tracking-[0.24em] uppercase mb-5">
            <span className="inline-block w-5 h-px bg-coral" />
            Get started
          </p>
          <h2 className="font-playfair font-black leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.4rem,4.6vw,4.2rem)' }}>
            Submit your<br /><em className="text-coral not-italic font-playfair italic">brief.</em>
          </h2>
        </div>
        <p className="text-offwhite/65 font-light leading-[1.85] md:pt-4" style={{ fontSize: '1.05rem' }}>
          Fill in the form below and we&apos;ll come back within 48 hours with a curated shortlist — complete with audience data and clear pricing. No obligation. No upfront fees.
        </p>
      </div>

      {/* Form panel — cream card on dark page for maximum contrast */}
      <div className="max-w-5xl mx-auto bg-offwhite text-dark border border-coral/20 rounded-sm shadow-2xl shadow-coral/5 p-6 md:p-12 ring-1 ring-coral/10">
        {/* Progress bar */}
        <div className="mb-3 h-px bg-dark/10">
          <div className="h-full bg-coral transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-dark/45 mb-10 min-h-[1rem]">
          {step > 0 && step < totalSteps ? `Step ${step} of ${totalSteps}` : ' '}
        </p>

        {/* Step 0: Track select */}
        {step === 0 && (
          <div>
            <span className="text-[0.65rem] tracking-[0.22em] uppercase text-coral font-medium block mb-3">First things first</span>
            <h3 className="font-playfair font-black leading-tight tracking-tight mb-3 text-dark" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
              I am a <em className="text-dark/45">golf...</em>
            </h3>
            <p className="text-dark/60 font-light leading-relaxed mb-10 text-base">Select which best describes you — the form adapts from here.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                { val: 'club' as Track, title: 'Club / Venue', sub: 'Promoting your course, facilities or membership' },
                { val: 'brand' as Track, title: 'Brand / Product', sub: 'Promoting equipment, apparel or a service' },
              ].map(opt => (
                <button
                  key={opt.val!}
                  type="button"
                  onClick={() => setTrack(opt.val)}
                  className={`p-7 text-left border-2 transition-all ${
                    track === opt.val
                      ? 'border-coral bg-coral/10'
                      : 'border-dark/15 hover:border-coral hover:bg-coral/[0.04]'
                  }`}
                >
                  <div className="text-base font-medium text-dark mb-2">{opt.title}</div>
                  <div className="text-sm text-dark/60 font-light leading-snug">{opt.sub}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={next} className={navBtnNext}>
                Continue &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Contact */}
        {step === 1 && (
          <div className="max-w-2xl">
            <StepTag n={1} label="About you" />
            <h3 className="font-playfair font-black leading-tight tracking-tight mb-3 text-dark" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
              Your <em className="text-dark/45">details.</em>
            </h3>
            <p className="text-dark/60 font-light mb-10 text-base">So we know who to send your influencer options to.</p>
            <Field label="Your name *">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="James Smith" className={inputCls} />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Email *">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="james@yourclub.co.uk" className={inputCls} />
              </Field>
              <Field label="Phone">
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+44 7700 900000" className={inputCls} />
              </Field>
            </div>
            <Field label={track === 'club' ? 'Club name *' : 'Brand / company name *'}>
              <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder={track === 'club' ? 'e.g. Sunningdale Golf Club' : 'e.g. Acme Golf Co.'} className={inputCls} />
            </Field>
            <Field label="Location">
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Town / County" className={inputCls} />
            </Field>
            <div className="flex justify-between items-center mt-10 pt-8 border-t border-dark/10">
              <button type="button" onClick={back} className={navBtnBack}>&larr; Back</button>
              <button type="button" onClick={next} className={navBtnNext}>Continue &rarr;</button>
            </div>
          </div>
        )}

        {/* Step 2a: Club */}
        {step === 2 && track === 'club' && (
          <div>
            <StepTag n={2} label="What to promote" />
            <h3 className="font-playfair font-black leading-tight tracking-tight mb-3 text-dark" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
              What are you <em className="text-dark/45">promoting?</em>
            </h3>
            <p className="text-dark/60 font-light mb-10 text-base">Select everything that applies — we use this to match you with the right creators.</p>
            {clubPromoteGroups.map(group => (
              <div key={group.label}>
                <SectionTag>{group.label}</SectionTag>
                <PillGroup items={group.items} selected={clubItems} onToggle={v => toggleItem(clubItems, setClubItems, v)} />
              </div>
            ))}
            <div className="flex justify-between items-center mt-10 pt-8 border-t border-dark/10">
              <button type="button" onClick={back} className={navBtnBack}>&larr; Back</button>
              <button type="button" onClick={next} className={navBtnNext}>Continue &rarr;</button>
            </div>
          </div>
        )}

        {/* Step 2b: Brand */}
        {step === 2 && track === 'brand' && (
          <div>
            <StepTag n={2} label="Your product" />
            <h3 className="font-playfair font-black leading-tight tracking-tight mb-3 text-dark" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
              What are you <em className="text-dark/45">promoting?</em>
            </h3>
            <p className="text-dark/60 font-light mb-10 text-base">Tell us about your product and the type of content you&apos;re looking for.</p>
            <Field label="Product or service *">
              <input type="text" value={productService} onChange={e => setProductService(e.target.value)} placeholder="e.g. New irons range, GPS watch, polo shirt collection..." className={inputCls} />
            </Field>
            <SectionTag>Content type</SectionTag>
            <PillGroup items={brandContentTypes} selected={contentTypes} onToggle={v => toggleItem(contentTypes, setContentTypes, v)} />
            <SectionTag>Target golfer</SectionTag>
            <PillGroup items={golferTypes} selected={golfers} onToggle={v => toggleItem(golfers, setGolfers, v)} />
            <Field label="Can you send product to the influencer?">
              <select value={sendProduct} onChange={e => setSendProduct(e.target.value)} className={selectCls}>
                <option value="">Select an option</option>
                <option>Yes — happy to send product</option>
                <option>Yes — digital / service</option>
                <option>No — paid partnership only</option>
                <option>Open to discussion</option>
              </select>
            </Field>
            <div className="flex justify-between items-center mt-10 pt-8 border-t border-dark/10">
              <button type="button" onClick={back} className={navBtnBack}>&larr; Back</button>
              <button type="button" onClick={next} className={navBtnNext}>Continue &rarr;</button>
            </div>
          </div>
        )}

        {/* Step 3: Campaign */}
        {step === 3 && (
          <div>
            <StepTag n={3} label="Campaign details" />
            <h3 className="font-playfair font-black leading-tight tracking-tight mb-3 text-dark" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>
              Budget &amp; <em className="text-dark/45">timing.</em>
            </h3>
            <p className="text-dark/60 font-light mb-10 text-base">Help us find influencers at the right price point for your campaign.</p>
            <SectionTag>Preferred platform</SectionTag>
            <PillGroup items={platforms} selected={selectedPlatforms} onToggle={v => toggleItem(selectedPlatforms, setSelectedPlatforms, v)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Budget range">
                <select value={budget} onChange={e => setBudget(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  <option>Under £150</option><option>£150 – £300</option><option>£300 – £600</option>
                  <option>£600 – £1,000</option><option>£1,000 – £2,500</option><option>£2,500+</option>
                  <option>Not sure — need guidance</option>
                </select>
              </Field>
              <Field label="Timeline">
                <select value={timeline} onChange={e => setTimeline(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  <option>ASAP</option><option>Within 2 weeks</option><option>Within a month</option>
                  <option>1–3 months</option><option>Planning ahead</option>
                </select>
              </Field>
              <Field label="Geographic reach">
                <select value={geoReach} onChange={e => setGeoReach(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  <option>Local (within 20 miles)</option><option>Regional</option>
                  <option>National (UK wide)</option><option>International</option><option>Doesn&apos;t matter</option>
                </select>
              </Field>
              <Field label="Number of influencers">
                <select value={numInfluencers} onChange={e => setNumInfluencers(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  <option>Just 1</option><option>2–3</option><option>4–6</option><option>6+</option><option>Not sure</option>
                </select>
              </Field>
            </div>
            <Field label="Anything else we should know?">
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any specific ideas, requirements, or questions..." rows={4}
                className="w-full bg-white border border-dark/15 rounded-sm px-4 py-3 text-base text-dark font-light placeholder-dark/35 focus:outline-none focus:border-coral transition-colors resize-none leading-relaxed" />
            </Field>

            {submitError && (
              <p className="text-coral text-sm mt-4 mb-2">{submitError}</p>
            )}

            <div className="flex justify-between items-center mt-10 pt-8 border-t border-dark/10">
              <button type="button" onClick={back} disabled={submitting} className={navBtnBack}>&larr; Back</button>
              <button type="button" onClick={submitBrief} disabled={submitting} className={navBtnNext}>
                {submitting ? 'Sending…' : 'Send my brief →'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="py-12 md:py-16">
            <span className="text-[0.65rem] tracking-[0.22em] uppercase text-coral font-medium block mb-4">You&apos;re all set</span>
            <h3 className="font-playfair font-black leading-none tracking-tight mb-5 text-dark" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
              Brief<br />received.
            </h3>
            <p className="text-dark/65 font-light leading-[1.85] max-w-md" style={{ fontSize: '1rem' }}>
              We&apos;ll be in touch within 48 hours with a curated shortlist of golf influencers — complete with audience stats and clear pricing. Keep an eye on your inbox.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
