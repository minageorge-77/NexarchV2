"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable from "@/components/admin/DataTable";
import Reveal from "@/components/Reveal";
import RoleModal from "@/components/admin/modals/RoleModal";
import { rolesApi } from "@/lib/api/roles";

export default function RolesManagementPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const { data: roles, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: rolesApi.list
  });

  const createMutation = useMutation({
    mutationFn: rolesApi.create,
    onSuccess: () => {
      toast.success("Role created successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create role");
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => rolesApi.update(id, payload),
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: rolesApi.delete,
    onSuccess: () => {
      toast.success("Role deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete role");
    }
  });

  const handleAdd = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleSave = async (payload) => {
    if (editingRole) {
      await updateMutation.mutateAsync({ id: editingRole.id || editingRole._id, payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      deleteMutation.mutate(id);
    }
  };

  const columns = [
  {
    header: "Role Name",
    accessor: (row) =>
    <div className="flex items-center gap-2">
          <p className="font-bold text-graphite">{row.name}</p>
          {row.isSystem &&
      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-[#f7f7f7] text-graphite border border-lightgray">
              System
            </span>
      }
        </div>

  },
  {
    header: "Description",
    accessor: (row) =>
    <span className="text-cloud text-sm">
          {row.description}
        </span>

  },
  {
    header: "Permissions",
    accessor: (row) =>
    <span className="text-cloud text-sm">
          {row.permissions?.length || 0} assigned
        </span>

  },
  {
    header: "Actions",
    accessor: (row) =>
    <div className="flex items-center gap-3">
          <button onClick={() => handleEdit(row)} className="text-graphite hover:text-black transition-colors">Edit</button>
          {!row.isSystem &&
      <button
        onClick={() => handleDelete(row.id || row._id)}
        disabled={deleteMutation.isPending}
        className="text-red-500 hover:text-red-600 transition-colors disabled:opacity-50">
        
              Delete
            </button>
      }
        </div>,

    className: "w-24"
  }];


  return (
    <>
      <Reveal variant="up">
        <AdminPageHeader
          title="Roles & Permissions"
          subtitle="Define roles and access levels for dashboard users."
          actionLabel="Add Role"
          onAction={handleAdd} />
        
        
        {isLoading ?
        <div className="flex justify-center p-12">
            <svg className="animate-spin h-8 w-8 text-graphite" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div> :

        <DataTable
          columns={columns}
          data={roles || []}
          keyExtractor={(row) => row.id || row._id} />

        }
      </Reveal>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={editingRole}
        onSave={handleSave}
        isSaving={createMutation.isPending || updateMutation.isPending} />
      
    </>);

}