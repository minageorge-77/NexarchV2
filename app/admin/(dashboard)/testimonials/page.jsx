"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable from "@/components/admin/DataTable";
import Reveal from "@/components/Reveal";
import TestimonialModal from "@/components/admin/modals/TestimonialModal";
import { testimonialsApi } from "@/lib/api/testimonials";

export default function TestimonialsManagementPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: testimonialsApi.list
  });

  const createMutation = useMutation({
    mutationFn: testimonialsApi.create,
    onSuccess: () => {
      toast.success("Testimonial created successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create testimonial");
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => testimonialsApi.update(id, payload),
    onSuccess: () => {
      toast.success("Testimonial updated successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update testimonial");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: testimonialsApi.delete,
    onSuccess: () => {
      toast.success("Testimonial deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete testimonial");
    }
  });

  const handleAdd = () => {
    setEditingTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleSave = async (payload) => {
    if (editingTestimonial) {
      await updateMutation.mutateAsync({ id: editingTestimonial.id || editingTestimonial._id, payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteMutation.mutate(id);
    }
  };

  const columns = [
  {
    header: "Client",
    accessor: (row) =>
    <div>
          <p className="font-bold text-graphite">{row.clientName}</p>
          <p className="text-xs text-cloud mt-1">{row.clientTitle}{row.company ? ` - ${row.company}` : ""}</p>
        </div>

  },
  {
    header: "Rating",
    accessor: (row) =>
    <div className="flex text-graphite">
          {[...Array(5)].map((_, i) =>
      <svg key={i} className={`w-4 h-4 ${i < row.rating ? "text-graphite" : "text-lightgray"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
      )}
        </div>

  },
  {
    header: "Featured",
    accessor: (row) =>
    <span className="text-sm">
          {row.featured ? "Yes" : "No"}
        </span>

  },
  {
    header: "Status",
    accessor: (row) =>
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
    row.status === "published" ?
    "bg-[#f7f7f7] text-graphite border border-lightgray" :
    "bg-white text-cloud border border-lightgray"}`
    }>
          {row.status?.toUpperCase() || "DRAFT"}
        </span>

  },
  {
    header: "Actions",
    accessor: (row) =>
    <div className="flex items-center gap-3">
          <button onClick={() => handleEdit(row)} className="text-graphite hover:text-black transition-colors">Edit</button>
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
          title="Testimonials Management"
          subtitle="Manage client reviews and success stories."
          actionLabel="Add Testimonial"
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
          data={testimonials || []}
          keyExtractor={(row) => row.id || row._id} />

        }
      </Reveal>

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testimonial={editingTestimonial}
        onSave={handleSave}
        isSaving={createMutation.isPending || updateMutation.isPending} />
      
    </>);

}