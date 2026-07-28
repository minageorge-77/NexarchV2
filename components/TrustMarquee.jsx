const practices = [
"Summit Implant & Oral Surgery",
"Riverbend Dental Implants",
"Precision Prosthodontics",
"Brightview Oral Surgery",
"Coastal Implant Group",
"Anchor Dental Specialists"];


export default function TrustMarquee() {
  const doubled = [...practices, ...practices];

  return (
    <section className="bg-graphite py-6 overflow-hidden border-t border-white/10" aria-label="Trusted practices">
      <p className="text-center font-mono text-[10px] uppercase text-cloud mb-4">
        Trusted by implant practices in 14 states
      </p>
      <div className="marquee-wrap w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-14 whitespace-nowrap w-max">
          {doubled.map((name, i) =>
          <span key={i} className="text-white/60 font-display font-bold text-lg tracking-wide">
              {name}
            </span>
          )}
        </div>
      </div>
    </section>);

}