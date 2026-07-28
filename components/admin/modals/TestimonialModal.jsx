"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";









export default function TestimonialModal({ isOpen, onClose, testimonial, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientTitle: "",
    company: "",
    content: "",
    imageUrl: "",
    rating: 5,
    featured: false,
    order: 0,
    status: "draft"
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (testimonial) {
      setFormData({
        clientName: testimonial.clientName || "",
        clientTitle: testimonial.clientTitle || "",
        company: testimonial.company || "",
        content: testimonial.content || "",
        imageUrl: testimonial.imageUrl || "",
        rating: testimonial.rating || 5,
        featured: testimonial.featured || false,
        order: testimonial.order || 0,
        status: testimonial.status || "draft"
      });
      setImagePreview(testimonial.imageUrl || "");
    } else {
      setFormData({
        clientName: "",
        clientTitle: "",
        company: "",
        content: "",
        imageUrl: "",
        rating: 5,
        featured: false,
        order: 0,
        status: "draft"
      });
      setImagePreview("");
    }
    setImageFile(null);
    setUploadError("");
  }, [testimonial, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUploadError("");
    if (!file) {
      setImageFile(null);
      setImagePreview(formData.imageUrl || "");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      setUploadError("Image must be smaller than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.imageUrl;
    
    const formDataUpload = new FormData();
    formDataUpload.append("file", imageFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formDataUpload,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to upload image");

    return data.data.secure_url;
  };

  const deleteOldImage = async (url) => {
    try {
      if (!url) return;
      await fetch(`/api/upload?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete old image", e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");
    
    let finalImageUrl = formData.imageUrl;

    if (imageFile) {
      try {
        setIsUploading(true);
        finalImageUrl = await uploadImage();
        
        // If editing and replacing an old image, delete the old one
        if (testimonial && testimonial.imageUrl && testimonial.imageUrl !== finalImageUrl) {
          await deleteOldImage(testimonial.imageUrl);
        }
      } catch (error) {
        setUploadError(error.message);
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    const payload = { ...formData, imageUrl: finalImageUrl };
    await onSave(payload);
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
          className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white text-graphite z-[110] shadow-2xl flex flex-col overflow-hidden">
          
            <div className="flex items-center justify-between p-6 border-b border-lightgray bg-[#f7f7f7]">
              <h2 className="text-xl font-display font-bold">
                {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
              </h2>
              <button onClick={onClose} className="text-cloud hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Client Name</label>
                  <input
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 focus:border-graphite focus:outline-none transition-colors" />
                
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Client Title</label>
                    <input
                    required
                    value={formData.clientTitle}
                    onChange={(e) => setFormData({ ...formData, clientTitle: e.target.value })}
                    className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 focus:border-graphite focus:outline-none transition-colors" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Company</label>
                    <input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 focus:border-graphite focus:outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Client Image</label>
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    {imagePreview ? (
                      <div className="w-16 h-16 rounded-full border border-lightgray overflow-hidden shrink-0">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#f7f7f7] flex items-center justify-center text-graphite font-bold shrink-0">
                        {formData.clientName ? formData.clientName.charAt(0) : "?"}
                      </div>
                    )}
                    <div className="flex-1 w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-cloud file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#f7f7f7] file:text-graphite hover:file:bg-lightgray transition-colors"
                      />
                      {uploadError && <p className="text-red-500 text-xs mt-2">{uploadError}</p>}
                      <p className="text-xs text-cloud mt-2">Max size: 5MB.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Testimonial Content</label>
                  <textarea
                  required
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 focus:border-graphite focus:outline-none transition-colors resize-y" />
                
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Rating (1-5)</label>
                    <input
                    type="number"
                    required
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                    className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 focus:border-graphite focus:outline-none transition-colors" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Order</label>
                    <input
                    type="number"
                    required
                    min={0}
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 focus:border-graphite focus:outline-none transition-colors" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Status</label>
                    <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 focus:border-graphite focus:outline-none transition-colors">
                    
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
                  className="w-5 h-5 text-graphite rounded border-lightgray focus:ring-graphite" />
                
                  <label htmlFor="featured" className="font-bold text-graphite">Feature on Homepage</label>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-lightgray bg-[#f7f7f7] flex justify-end gap-3 shrink-0">
              <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-cloud hover:bg-lightgray transition-colors">
              
                Cancel
              </button>
              <button
              type="submit"
              form="testimonial-form"
              disabled={isSaving || isUploading}
              className="px-6 py-2.5 rounded-xl font-bold bg-graphite hover:bg-black text-white shadow-md transition-colors disabled:opacity-50 flex items-center gap-2">
              
                {isUploading ? "Uploading..." : isSaving ? "Saving..." : "Save Testimonial"}
              </button>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}