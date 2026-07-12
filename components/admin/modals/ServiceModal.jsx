"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";










export default function ServiceModal({ isOpen, onClose, service, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    icon: "",
    features: [""],
    order: 0,
    status: "draft"
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        slug: service.slug || "",
        shortDescription: service.shortDescription || "",
        description: service.description || "",
        icon: service.icon || "",
        features: service.features?.length ? service.features : [""],
        order: service.order || 0,
        status: service.status || "draft"
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        shortDescription: "",
        description: "",
        icon: "",
        features: [""],
        order: 0,
        status: "draft"
      });
    }
  }, [service, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, features: formData.features.filter((f) => f.trim() !== "") };
    await onSave(payload);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures.length ? newFeatures : [""] });
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
          className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-surface text-on-surface z-[110] shadow-2xl flex flex-col overflow-hidden">
          
            <div className="flex items-center justify-between p-6 border-b border-outline-variant bg-surface-warm">
              <h2 className="text-xl font-display font-bold">
                {service ? "Edit Service" : "Add New Service"}
              </h2>
              <button onClick={onClose} className="text-on-surface-variant hover:text-lime transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="service-form" onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Title</label>
                    <input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Slug</label>
                    <input
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                  
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Short Description</label>
                  <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors resize-none" />
                
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Full Description (HTML)</label>
                  <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors resize-y font-mono text-sm" />
                
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Icon (Optional)</label>
                    <input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
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

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Features</label>
                  <div className="space-y-2">
                    {formData.features.map((feature, idx) =>
                  <div key={idx} className="flex items-center gap-2">
                        <input
                      value={feature}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      placeholder={`Feature ${idx + 1}`}
                      className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                    
                        <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                  )}
                    <button type="button" onClick={addFeature} className="text-sm font-bold text-lime hover:text-lime-dark transition-colors">
                      + Add Feature
                    </button>
                  </div>
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
              form="service-form"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl font-bold bg-lime hover:bg-lime-dark text-white shadow-md transition-colors disabled:opacity-50 flex items-center gap-2">
              
                {isSaving ? "Saving..." : "Save Service"}
              </button>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}