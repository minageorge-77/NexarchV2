"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable from "@/components/admin/DataTable";
import Reveal from "@/components/Reveal";
import AdminModal from "@/components/admin/modals/AdminModal";
import { usersApi } from "@/lib/api/users";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminsManagementPage() {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const { data: admins, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: usersApi.list
  });

  const createMutation = useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      toast.success("Admin created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create admin");
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => usersApi.update(id, payload),
    onSuccess: () => {
      toast.success("Admin updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update admin");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: usersApi.delete,
    onSuccess: () => {
      toast.success("Admin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete admin");
    }
  });

  const handleAdd = () => {
    setEditingAdmin(null);
    setIsModalOpen(true);
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setIsModalOpen(true);
  };

  const handleSave = async (payload) => {
    if (editingAdmin) {
      await updateMutation.mutateAsync({ id: editingAdmin.id || editingAdmin._id, payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this administrator?")) {
      deleteMutation.mutate(id);
    }
  };

  const columns = [
  {
    header: "Administrator",
    accessor: (row) =>
    <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-xs font-bold text-primary">
            {row.firstName?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-bold text-on-surface">{row.firstName} {row.lastName}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{row.email}</p>
          </div>
        </div>

  },
  {
    header: "Roles",
    accessor: (row) =>
    <div className="flex flex-wrap gap-2">
          {row.roles?.length ? row.roles.map((role, idx) =>
      <span key={idx} className="inline-block px-2.5 py-1 rounded border border-outline-variant/50 bg-surface-warm text-xs text-on-surface font-medium">
              {role.name || role}
            </span>
      ) :
      <span className="text-xs text-on-surface-variant">No roles</span>
      }
        </div>

  },
  {
    header: "Status",
    accessor: (row) =>
    <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${row.status === "active" ? "bg-lime" : "bg-outline"}`}></div>
          <span className="text-sm capitalize">{row.status}</span>
        </div>

  },
  {
    header: "Last Login",
    accessor: (row) => row.lastLogin ? new Date(row.lastLogin).toLocaleDateString() : "Never"
  },
  {
    header: "Actions",
    accessor: (row) => {
      const id = row.id || row._id;
      const isSelf = currentUser?.id === id;

      return (
        <div className="flex items-center gap-3">
            <button onClick={() => handleEdit(row)} className="text-on-surface hover:text-lime transition-colors">Edit</button>
            {!isSelf &&
          <button
            onClick={() => handleDelete(id)}
            disabled={deleteMutation.isPending}
            className="text-red-500 hover:text-red-600 transition-colors disabled:opacity-50">
            
                Delete
              </button>
          }
          </div>);

    },
    className: "w-24"
  }];


  return (
    <>
      <Reveal variant="up">
        <AdminPageHeader
          title="Admin Management"
          subtitle="Manage users who have access to the NexArch dashboard."
          actionLabel="Add Admin"
          onAction={handleAdd} />
        
        
        {isLoading ?
        <div className="flex justify-center p-12">
            <svg className="animate-spin h-8 w-8 text-lime" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div> :

        <DataTable
          columns={columns}
          data={admins || []}
          keyExtractor={(row) => row.id || row._id} />

        }
      </Reveal>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        admin={editingAdmin}
        onSave={handleSave}
        isSaving={createMutation.isPending || updateMutation.isPending} />
      
    </>);

}