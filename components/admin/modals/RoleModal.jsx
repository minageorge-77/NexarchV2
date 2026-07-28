"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "@/lib/api/roles";









export default function RoleModal({ isOpen, onClose, role, onSave, isSaving }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: []
  });

  const { data: allPermissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: rolesApi.getPermissions,
    enabled: isOpen
  });

  const permissionsByModule = useMemo(() => {
    if (!allPermissions) return {};
    const grouped = {};
    allPermissions.forEach((p) => {
      if (!grouped[p.module]) grouped[p.module] = [];
      grouped[p.module].push(p);
    });
    return grouped;
  }, [allPermissions]);

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || "",
        description: role.description || "",
        permissions: role.permissions?.map((p) => p._id || p.id) || []
      });
    } else {
      setFormData({
        name: "",
        description: "",
        permissions: []
      });
    }
  }, [role, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  const togglePermission = (permId) => {
    if (role?.isSystem) return; // Cannot edit system roles
    const newPerms = formData.permissions.includes(permId) ?
    formData.permissions.filter((id) => id !== permId) :
    [...formData.permissions, permId];
    setFormData({ ...formData, permissions: newPerms });
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
          className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white text-graphite z-[110] shadow-2xl flex flex-col overflow-hidden">
          
            <div className="flex items-center justify-between p-6 border-b border-lightgray bg-[#f7f7f7]">
              <h2 className="text-xl font-display font-bold">
                {role ? "Edit Role" : "Add New Role"}
              </h2>
              <button onClick={onClose} className="text-cloud hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {role?.isSystem &&
            <div className="mb-6 p-4 bg-[#f7f7f7] border border-lightgray rounded-xl text-graphite text-sm font-medium">
                  This is a system role. You cannot modify its permissions.
                </div>
            }

              <form id="role-form" onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Role Name</label>
                  <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={role?.isSystem}
                  className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 focus:border-graphite focus:outline-none transition-colors disabled:opacity-50" />
                
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-1.5">Description</label>
                  <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={role?.isSystem}
                  className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-2.5 focus:border-graphite focus:outline-none transition-colors resize-none disabled:opacity-50" />
                
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cloud mb-3">Permissions</label>
                  {!allPermissions ?
                <p className="text-sm text-cloud">Loading permissions...</p> :

                <div className="space-y-6">
                      {Object.entries(permissionsByModule).map(([module, perms]) =>
                  <div key={module} className="border border-lightgray rounded-xl overflow-hidden bg-[#f7f7f7]">
                          <div className="bg-[#f7f7f7] px-4 py-2 border-b border-lightgray font-bold text-sm uppercase text-graphite">
                            {module}
                          </div>
                          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {perms.map((p) => {
                        const pId = p._id || p.id;
                        return (
                          <div key={pId} className="flex items-start gap-3">
                                  <input
                              type="checkbox"
                              id={`perm-${pId}`}
                              checked={formData.permissions.includes(pId)}
                              onChange={() => togglePermission(pId)}
                              disabled={role?.isSystem}
                              className="mt-1 w-4 h-4 text-graphite rounded border-lightgray focus:ring-graphite disabled:opacity-50" />
                            
                                  <label htmlFor={`perm-${pId}`} className={`text-sm ${role?.isSystem ? '' : 'cursor-pointer'}`}>
                                    <span className="block font-medium text-graphite capitalize">{p.action}</span>
                                    {p.description && <span className="block text-xs text-cloud mt-0.5">{p.description}</span>}
                                  </label>
                                </div>);

                      })}
                          </div>
                        </div>
                  )}
                    </div>
                }
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
              form="role-form"
              disabled={isSaving || role?.isSystem}
              className="px-6 py-2.5 rounded-xl font-bold bg-graphite hover:bg-black text-white shadow-md transition-colors disabled:opacity-50 flex items-center gap-2">
              
                {isSaving ? "Saving..." : "Save Role"}
              </button>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}