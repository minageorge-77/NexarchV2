"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable from "@/components/admin/DataTable";
import Reveal from "@/components/Reveal";
import ServiceModal from "@/components/admin/modals/ServiceModal";
import { servicesApi } from "@/lib/api/services";

export default function ServicesManagementPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.list
  });

  const createMutation = useMutation({
    mutationFn: servicesApi.create,
    onSuccess: () => {
      toast.success("Service created successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create service");
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => servicesApi.update(id, payload),
    onSuccess: () => {
      toast.success("Service updated successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update service");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: servicesApi.delete,
    onSuccess: () => {
      toast.success("Service deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete service");
    }
  });

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSave = async (payload) => {
    if (editingService) {
      await updateMutation.mutateAsync({ id: editingService.id || editingService._id, payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteMutation.mutate(id);
    }
  };

  const columns = [
  {
    header: "Title",
    accessor: (row) =>
    <div>
          <p className="font-bold text-on-surface">{row.title}</p>
          <p className="font-mono text-[10px] text-outline mt-1">/{row.slug}</p>
        </div>

  },
  {
    header: "Status",
    accessor: (row) =>
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
    row.status === "published" ?
    "bg-lime/10 text-lime-dark border border-lime/20" :
    "bg-outline-variant/30 text-on-surface-variant border border-outline-variant"}`
    }>
          {row.status?.toUpperCase() || "DRAFT"}
        </span>

  },
  {
    header: "Last Updated",
    accessor: (row) => new Date(row.updatedAt).toLocaleDateString()
  },
  {
    header: "Actions",
    accessor: (row) =>
    <div className="flex items-center gap-3">
          <button onClick={() => handleEdit(row)} className="text-on-surface hover:text-lime transition-colors">Edit</button>
          <button
        onClick={() => handleDelete(row.id || row._id)}
        disabled={deleteMutation.isPending}
        className="text-red-500 hover:text-red-600 transition-colors disabled:opacity-50">
        
            Delete
          </button>
        </div>,

    className: "w-24"
  }];


  return (
    <>
      <Reveal variant="up">
        <AdminPageHeader
          title="Services Management"
          subtitle="Manage the core offerings displayed on the public landing pages."
          actionLabel="Add Service"
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
          data={services || []}
          keyExtractor={(row) => row.id || row._id} />

        }
      </Reveal>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={editingService}
        onSave={handleSave}
        isSaving={createMutation.isPending || updateMutation.isPending} />
      
    </>);

}