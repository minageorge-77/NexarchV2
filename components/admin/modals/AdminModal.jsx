"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "@/lib/api/roles";









export default function AdminModal({ isOpen, onClose, admin, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", // Only for new admins
    roles: [],
    status: "active"
  });

  const { data: allRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: rolesApi.list,
    enabled: isOpen // Only fetch when modal is open
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email || "",
        password: "", // Never edit password here usually, or keep blank
        roles: admin.roles?.map((r) => r._id || r.id) || [],
        status: admin.status || "active"
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: [],
        status: "active"
      });
    }
  }, [admin, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, roleIds: formData.roles };
    delete payload.roles;

    if (admin && !payload.password) {
      delete payload.password;
    }
    await onSave(payload);
  };

  const toggleRole = (roleId) => {
    const newRoles = formData.roles.includes(roleId) ?
    formData.roles.filter((id) => id !== roleId) :
    [...formData.roles, roleId];
    setFormData({ ...formData, roles: newRoles });
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
                {admin ? "Edit Administrator" : "Add Administrator"}
              </h2>
              <button onClick={onClose} className="text-on-surface-variant hover:text-lime transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="admin-form" onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">First Name</label>
                    <input
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Last Name</label>
                    <input
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                  
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Email Address</label>
                  <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">
                    {admin ? "Password (leave blank to keep current)" : "Password"}
                  </label>
                  <input
                  type="password"
                  required={!admin}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors" />
                
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5">Status</label>
                  <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 focus:border-lime focus:outline-none transition-colors">
                  
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2">Assign Roles</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-outline-variant rounded-xl p-3 bg-surface-container-lowest">
                    {allRoles ? allRoles.map((role) =>
                  <div key={role._id || role.id} className="flex items-center gap-3">
                        <input
                      type="checkbox"
                      id={`role-${role._id || role.id}`}
                      checked={formData.roles.includes(role._id || role.id)}
                      onChange={() => toggleRole(role._id || role.id)}
                      className="w-5 h-5 text-lime rounded border-outline-variant focus:ring-lime" />
                    
                        <label htmlFor={`role-${role._id || role.id}`} className="text-sm font-medium text-on-surface flex-1 cursor-pointer">
                          {role.name}
                        </label>
                      </div>
                  ) :
                  <p className="text-sm text-on-surface-variant">Loading roles...</p>
                  }
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
              form="admin-form"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl font-bold bg-lime hover:bg-lime-dark text-white shadow-md transition-colors disabled:opacity-50 flex items-center gap-2">
              
                {isSaving ? "Saving..." : "Save Admin"}
              </button>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}