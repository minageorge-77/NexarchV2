"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { apiClient } from "@/lib/api/axios";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    clinicName: "",
    interestedService: "",
    message: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      await apiClient.post("/contact", formData);
      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        clinicName: "",
        interestedService: "",
        message: ""
      });
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      setStatus("error");
      setErrorMessage(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main id="top" className="bg-white pt-24">
        {/* Hero Section */}
        <section className="relative w-full bg-graphite pt-20 pb-24 overflow-hidden bg-[url('/contact%20us.png')] bg-cover bg-center bg-fixed">
          {/* Dark Overlay over the fixed background image */}
          <div className="absolute inset-0 bg-graphite/80 z-0"></div>
          <div className="absolute inset-0 bg-[url('/media/noise.png')] opacity-10 mix-blend-overlay z-0"></div>
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
            <Reveal variant="up" className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-[11px] text-cloud uppercase mb-4 block tracking-wider">
                Get in Touch
              </span>
              <h1 className="text-white text-[40px] md:text-[56px] font-display font-extrabold tracking-tight uppercase leading-none mb-6">
                Start Your <br /> Growth Engine
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-medium">
                Request a consultation to see exactly how NexArch can scale your full-arch implant production.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12 bg-white rounded-[2rem] p-8 md:p-12 shadow-card border border-lightgray relative z-20">
              
              {/* Contact Info (Left) */}
              <div>
                <h2 className="text-2xl font-display font-bold text-graphite mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#f7f7f7] rounded-full flex items-center justify-center text-graphite flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-cloud mb-1">Email Us</h4>
                      <a href="mailto:hello@nexarch.io" className="text-graphite font-medium hover:text-black transition-colors">
                        hello@nexarch.io
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#f7f7f7] rounded-full flex items-center justify-center text-graphite flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-cloud mb-1">Call Us</h4>
                      <p className="text-graphite font-medium">1-800-NEX-ARCH</p>
                      <p className="text-cloud text-sm mt-1">Mon-Fri, 9am - 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#f7f7f7] rounded-full flex items-center justify-center text-graphite flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-cloud mb-1">Headquarters</h4>
                      <p className="text-graphite font-medium">100 Tech Row, Suite 400</p>
                      <p className="text-cloud text-sm mt-1">Austin, TX 78701</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form (Right) */}
              <div>
                {status === "success" ?
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#f7f7f7] rounded-[1.5rem] border border-lightgray">
                    <div className="w-16 h-16 bg-graphite text-white rounded-full flex items-center justify-center mb-6">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-graphite mb-2">Message Sent</h3>
                    <p className="text-cloud">We'll be in touch within 24 hours to schedule your consultation.</p>
                    <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-medium text-graphite underline hover:text-black">Send another message</button>
                  </div> :

                <form onSubmit={handleSubmit} className="space-y-5">
                    {status === "error" &&
                  <div className="p-4 bg-error/10 border border-error/20 rounded-xl">
                        <p className="text-error text-sm font-medium">{errorMessage}</p>
                      </div>
                  }
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-cloud mb-2">Full Name *</label>
                      <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" placeholder="John Doe" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-cloud mb-2">Email Address *</label>
                        <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-cloud mb-2">Phone Number</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-cloud mb-2">Clinic Name *</label>
                        <input required name="clinicName" value={formData.clinicName} onChange={handleChange} type="text" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" placeholder="Advanced Smiles" />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-cloud mb-2">Interested Service</label>
                        <select name="interestedService" value={formData.interestedService} onChange={handleChange} className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors">
                          <option value="">Select a service...</option>
                          <option value="Dental Marketing">Dental Marketing</option>
                          <option value="Dental Website Design">Dental Website Design</option>
                          <option value="Social Media Marketing">Social Media Marketing</option>
                          <option value="Traditional Marketing">Traditional Marketing</option>
                          <option value="Search Marketing">Search Marketing</option>
                          <option value="Videography">Videography</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-cloud mb-2">Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors resize-none" placeholder="Tell us about your practice..."></textarea>
                    </div>

                    <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full btn-primary bg-graphite hover:bg-black text-white font-bold py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                    
                      {status === "submitting" ? "Sending..." : "Request Consultation"}
                    </button>
                  </form>
                }
              </div>
            </div>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </>);
}