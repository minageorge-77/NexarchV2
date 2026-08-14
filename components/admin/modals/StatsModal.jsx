"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function StatsModal({ isOpen, onClose, stats, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    implantLeads: 412,
    consultations: 158,
    monthlyProduction: 48920,
    featuredImageUrl: "/results.png",
    featuredClinicName: "Summit Implant & Oral Surgery",
    featuredLocation: "Buda, TX",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (stats) {
      setFormData({
        implantLeads: stats.implantLeads ?? 412,
        consultations: stats.consultations ?? 158,
        monthlyProduction: stats.monthlyProduction ?? 48920,
        featuredImageUrl: stats.featuredImageUrl || "/results.png",
        featuredClinicName: stats.featuredClinicName || "Summit Implant & Oral Surgery",
        featuredLocation: stats.featuredLocation || "Buda, TX",
      });
      setImagePreview(stats.featuredImageUrl || "/results.png");
    }
    setImageFile(null);
    setUploadError("");
  }, [stats, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUploadError("");
    if (!file) {
      setImageFile(null);
      setImagePreview(formData.featuredImageUrl || "/results.png");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file");
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
    if (!imageFile) return formData.featuredImageUrl;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");

    let finalImageUrl = formData.featuredImageUrl;

    if (imageFile) {
      try {
        setIsUploading(true);
        finalImageUrl = await uploadImage();
      } catch (error) {
        setUploadError(error.message);
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    onSave({
      implantLeads: Number(formData.implantLeads),
      consultations: Number(formData.consultations),
      monthlyProduction: Number(formData.monthlyProduction),
      featuredImageUrl: finalImageUrl,
      featuredClinicName: formData.featuredClinicName,
      featuredLocation: formData.featuredLocation,
    });
  };

  const busy = isSaving || isUploading;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={busy ? undefined : onClose}
            className="fixed inset-0 bg-graphite/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-lightgray overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 sm:p-7 border-b border-lightgray flex items-center justify-between shrink-0">
              <div className="pr-4">
                <h3 className="text-lg sm:text-xl font-display font-bold text-graphite">
                  Edit Featured Case Study & Stats
                </h3>
                <p className="text-xs text-clinical mt-1">
                  Upload a photo and customize the live metrics displayed on the landing page.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={busy}
                className="text-clinical hover:text-graphite transition-colors p-2 -mr-1 sm:-mr-2 rounded-full hover:bg-gray-100 shrink-0 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
              {uploadError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {uploadError}
                </div>
              )}

              {/* 1. Featured Image Upload */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-graphite font-bold mb-2">
                  Featured Case Study Photo
                </label>
                <div className="space-y-3">
                  {imagePreview && (
                    <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-lightgray bg-[#f7f7f7]">
                      <Image
                        src={imagePreview}
                        alt="Featured Case Study Preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 600px) 100vw, 500px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">
                        Preview: {formData.featuredClinicName || "Clinic Name"}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2.5 bg-[#f7f7f7] hover:bg-lightgray text-graphite border border-lightgray rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {imageFile ? "Change Image" : "Upload New Photo"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {imageFile && (
                      <span className="text-xs text-clinical truncate max-w-[200px]">
                        {imageFile.name}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-clinical">
                    Recommended: 1200×675 px (16:9 Landscape) JPG or WebP (under 5MB).
                  </p>
                </div>
              </div>

              {/* 2. Clinic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-graphite font-bold mb-2">
                    Clinic / Practice Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.featuredClinicName}
                    onChange={(e) =>
                      setFormData({ ...formData, featuredClinicName: e.target.value })
                    }
                    className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 text-graphite font-medium text-sm focus:outline-none focus:border-graphite transition-colors"
                    placeholder="e.g. Summit Implant & Oral Surgery"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-graphite font-bold mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.featuredLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, featuredLocation: e.target.value })
                    }
                    className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 text-graphite font-medium text-sm focus:outline-none focus:border-graphite transition-colors"
                    placeholder="e.g. Buda, TX"
                  />
                </div>
              </div>

              {/* 3. Metrics */}
              <div className="pt-2 border-t border-lightgray/60 space-y-4">
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-clinical font-bold">
                  Live Stats Numbers
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-graphite font-bold mb-1">
                      Implant Leads
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={formData.implantLeads}
                      onChange={(e) =>
                        setFormData({ ...formData, implantLeads: e.target.value })
                      }
                      className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-3 py-2.5 text-graphite font-medium text-sm focus:outline-none focus:border-graphite transition-colors"
                      placeholder="412"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-graphite font-bold mb-1">
                      Consultations
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={formData.consultations}
                      onChange={(e) =>
                        setFormData({ ...formData, consultations: e.target.value })
                      }
                      className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-3 py-2.5 text-graphite font-medium text-sm focus:outline-none focus:border-graphite transition-colors"
                      placeholder="158"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-graphite font-bold mb-1">
                      Monthly Prod. ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={formData.monthlyProduction}
                      onChange={(e) =>
                        setFormData({ ...formData, monthlyProduction: e.target.value })
                      }
                      className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-3 py-2.5 text-graphite font-medium text-sm focus:outline-none focus:border-graphite transition-colors"
                      placeholder="48920"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-lightgray flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={busy}
                  className="px-5 py-2.5 rounded-xl border border-lightgray text-graphite hover:bg-gray-50 font-medium transition-colors text-sm disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="btn-primary bg-gold hover:bg-gold/90 text-graphite font-bold px-6 py-2.5 rounded-xl transition-all disabled:opacity-70 flex items-center gap-2 text-sm shadow-sm"
                >
                  {busy ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-graphite" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {isUploading ? "Uploading Image..." : "Saving..."}
                    </>
                  ) : (
                    "Save & Update Landing Page"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
