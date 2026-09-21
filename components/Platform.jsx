import Reveal from "./Reveal";

const features = [
{
  tag: "Predictable",
  title: "Predictable pipeline",
  body: "Search and social campaigns built specifically for how implant patients actually search and decide — split by single implant, All-on-X, and denture-replacement intent, because they're different buyers with different timelines.",
  icon:
  <path
    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2} />


},
{
  tag: "Fast",
  title: "Every enquiry answered fast",
  body: "Automated response within five minutes of any enquiry, by text and email, with simultaneous alerts to your front desk. Most practices lose full-arch leads to slow response, not bad ads.",
  icon:
  <path
    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2} />


},
{
  tag: "Numbers",
  title: "A number attached to every dollar",
  body: "Monthly reporting that follows a lead from click to booked consultation to accepted case — so budget decisions are made on what actually closed, not on impressions.",
  icon:
  <path
    d="M13 10V3L4 14h7v7l9-11h-7z"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2} />


}];


export default function Platform() {
  return (
    <section id="platform" className="py-24 px-5 bg-white">
      <div className="max-w-md md:max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-[30px] md:text-[42px] font-display font-extrabold text-graphite mt-3 leading-tight">
            Why the focus matters
          </h2>
          <p className="text-graphite text-[16px] md:text-[18px] font-medium mt-4 max-w-4xl mx-auto leading-relaxed">
            A single implant patient is worth a few thousand dollars. A completed full-arch case is typically worth $20,000–$30,000. That difference changes what a marketing program should actually optimize for — and it&apos;s why an agency built for general dentistry gets full-arch case acquisition wrong even when the ad spend is high and the leads keep coming. Two additional arch cases a month cover the cost of working with us and then some. That&apos;s the argument we&apos;re making, not a slogan we&apos;re using.
          </p>
        </Reveal>

        <Reveal className="text-center mb-10 mt-16 border-t border-lightgray pt-16">
          <h2 className="text-[26px] md:text-[34px] font-display font-extrabold text-graphite leading-tight">
            One system, three commitments
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) =>
          <Reveal key={f.title} delay={100 * (i + 1)}>
              <div className="lift-card bg-white p-7 rounded-2xl shadow-card border border-lightgray h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="icon-wrap w-12 h-12 bg-white border border-lightgray rounded-full flex items-center justify-center text-graphite">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {f.icon}
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] text-clinical uppercase">{f.tag}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-graphite mb-2">{f.title}</h3>
                <p className="text-clinical text-[15px] leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}
