"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";









export default function TestimonialModal({ isOpen, onClose, testimonial, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientTitle: "",
    company: "",
    content: "",
    rating: 5,
    featured: false,
    order: 0,
    status: "draft"
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        clientName: testimonial.clientName || "",
        clientTitle: testimonial.clientTitle || "",
        company: testimonial.company || "",
        content: testimonial.content || "",
        rating: testimonial.rating || 5,
        featured: testimonial.featured || false,
        order: testimonial.order || 0,
        status: testimonial.status || "draft"
      });
    } else {
      setFormData({
        clientName: "",
        clientTitle: "",
        company: "",
        content: "",
        rating: 5,
        featured: false,
        order: 0,
        status: "draft"
      });
    }
  }, [testimonial, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen &&
      <>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[100]" />
        
          <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-surface text-on-surface z-[110] shadow-2xl flex flex-col overflow-hidden">
          
            <div className="flex items-center justify-between p-6 border-b border-outline-variant bg-surface-warm">
              <h2 className="text-xl font-display font-bold">
                {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
              </h2>
              <button onClick={onClose} className="text-on-surface-variant hover:text-lime transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Client Name</label>
                  <input
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Client Title</label>
                    <input
                    required
                    value={formData.clientTitle}
                    onChange={(e) => setFormData({ ...formData, clientTitle: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Company</label>
                    <input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                  
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Testimonial Content</label>
                  <textarea
                  required
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors resize-y" />
                
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Rating (1-5)</label>
                    <input
                    type="number"
                    required
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Order</label>
                    <input
                    type="number"
                    required
                    min={0}
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Status</label>
                    <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors">
                    
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-lime rounded border-outline-variant focus:ring-lime" />
                
                  <label htmlFor="featured" className="font-bold text-on-surface">Feature on Homepage</label>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-outline-variant bg-surface-warm flex justify-end gap-3 shrink-0">
              <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors">
              
                Cancel
              </button>
              <button
              type="submit"
              form="testimonial-form"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl font-bold bg-lime hover:bg-lime-dark text-white shadow-md transition-colors disabled:opacity-50 flex items-center gap-2">
              
                {isSaving ? "Saving..." : "Save Testimonial"}
              </button>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}