import Reveal from "./Reveal";

const features = [
{
  tag: "CRM",
  title: "Implant Patient CRM",
  body: "Every consultation request lands in one pipeline, qualified by treatment interest — so high-value implant cases never sit unworked in an inbox.",
  icon:
  <path
    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2} />


},
{
  tag: "GA4",
  title: "Analytics Dashboard",
  body: "Google Analytics 4 data, visualized — visitor behavior, campaign performance, and CTA clicks in one dashboard built for practice owners, not analysts.",
  icon:
  <path
    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2} />


},
{
  tag: "CMS",
  title: "Content & SEO Management",
  body: "Services, testimonials, and case studies stay current from an admin dashboard your team controls — with technical SEO built in from the start.",
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
        <Reveal className="text-center mb-14">
          <span className="font-mono text-[11px] uppercase text-cloud">The Platform</span>
          <h2 className="text-[30px] md:text-[42px] font-display font-extrabold text-graphite mt-3 leading-tight">
            One platform, every stage of implant acquisition
          </h2>
          <p className="text-cloud mt-4 max-w-lg mx-auto">
            Most agencies hand you a report. NexArch hands you a growth platform — a high-converting website, a
            patient CRM, and a live analytics dashboard, running as one connected system.
          </p>
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
                  <span className="font-mono text-[10px] text-cloud uppercase">{f.tag}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-graphite mb-2">{f.title}</h3>
                <p className="text-cloud text-[15px] leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}