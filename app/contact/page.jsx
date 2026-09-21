"use client";

import { useState, useEffect } from "react";
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
    monthlyEnquiries: "",
    consultationDate: "",
    message: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); 
    
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const hours = String(tomorrow.getHours()).padStart(2, '0');
    const minutes = String(tomorrow.getMinutes()).padStart(2, '0');
    
    setMinDate(`${year}-${month}-${day}T${hours}:${minutes}`);
  }, []);

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
            <Reveal variant="up" className="text-center max-w-4xl mx-auto mb-16">
              <span className="font-mono text-[11px] text-clinical uppercase mb-4 block tracking-wider">
                Let's talk about your numbers
              </span>
              <h1 className="text-white text-[32px] md:text-[48px] font-display font-extrabold tracking-tight uppercase leading-none mb-6">
                Tell Us Where the Practice Stands Today
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-medium">
                Current enquiry volume, current close rate, what you're spending now if anything — whatever you have. We'll tell you plainly whether NexArch is a fit, including if the honest answer is not yet.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12 bg-white rounded-[2rem] p-8 md:p-12 shadow-card border border-lightgray relative z-20">
              
              {/* Contact Info (Left) */}
              <div>
                <h2 className="text-2xl font-display font-bold text-graphite mb-6">Direct Contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#f7f7f7] rounded-full flex items-center justify-center text-graphite flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-clinical mb-1">Phone</h4>
                      <p className="text-graphite font-medium">+1 208 247 4141</p>
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
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-clinical mb-1">Address</h4>
                      <p className="text-graphite font-medium leading-relaxed">
                        30 North Gould Street<br/>
                        Suite 100<br/>
                        Sheridan, WY 82801<br/>
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form (Right) */}
              <div>
                {status === "success" ? (
                  <div className="h-full w-full bg-white rounded-[1.5rem] border border-lightgray min-h-[500px] flex flex-col items-center justify-center p-8 text-center shadow-sm">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-graphite mb-3">Request Sent</h3>
                    <p className="text-clinical text-[15px] max-w-sm mb-8 leading-relaxed">
                      Thank you for reaching out. We will review your numbers and get back to you within one business day to confirm your consultation time.
                    </p>
                    <button onClick={() => {
                        setStatus("idle");
                        setFormData({
                          fullName: "",
                          email: "",
                          phone: "",
                          clinicName: "",
                          monthlyEnquiries: "",
                          consultationDate: "",
                          message: ""
                        });
                      }} className="btn-primary bg-graphite hover:bg-black text-white font-bold py-3 px-8 rounded-full transition-all">
                      Submit Another Request
                    </button>
                  </div>
                ) :

                <form onSubmit={handleSubmit} className="space-y-5">
                    {status === "error" &&
                  <div className="p-4 bg-error/10 border border-error/20 rounded-xl">
                        <p className="text-error text-sm font-medium">{errorMessage}</p>
                      </div>
                  }
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-clinical mb-2">Name *</label>
                      <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" placeholder="John Doe" />
                    </div>
                    
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-clinical mb-2">Practice Name *</label>
                      <input required name="clinicName" value={formData.clinicName} onChange={handleChange} type="text" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" placeholder="Advanced Smiles" />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-clinical mb-2">Email *</label>
                        <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-clinical mb-2">Phone</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-clinical mb-2">Current monthly implant enquiries (approx.)</label>
                      <input name="monthlyEnquiries" value={formData.monthlyEnquiries} onChange={handleChange} type="text" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" placeholder="e.g. 10" />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-clinical mb-2">Preferred Consultation Date & Time</label>
                      <input name="consultationDate" value={formData.consultationDate || ""} onChange={handleChange} min={minDate} type="datetime-local" className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors" />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-clinical mb-2">What are you hoping to fix?</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors resize-none" placeholder="Tell us about your practice..."></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full btn-primary bg-graphite hover:bg-black text-white font-bold py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed mb-3">
                        {status === "submitting" ? "Sending..." : "Request Consultation"}
                      </button>
                      <p className="text-center text-[12px] text-clinical font-medium">We respond within one business day. No auto-dialer, no sales sequence.</p>
                    </div>
                  </form>
                }
              </div>
            </div>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </>
  );
}
