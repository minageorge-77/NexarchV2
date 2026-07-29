"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable from "@/components/admin/DataTable";
import Reveal from "@/components/Reveal";
import { messagesApi } from "@/lib/api/messages";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagesManagementPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewingMessage, setViewingMessage] = useState(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: messagesApi.list
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => messagesApi.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Message status updated");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: messagesApi.delete,
    onSuccess: () => {
      toast.success("Message deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      if (viewingMessage) setViewingMessage(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleMarkAsRead = (id) => {
    updateStatusMutation.mutate({ id, status: "Read" });
  };

  // Filter and search logic
  const filteredMessages = useMemo(() => {
    if (!messages) return [];
    let filtered = messages;
    
    // Status Filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }

    // Search Query (search by name, email, or clinic)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(msg => 
        msg.fullName.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.clinicName.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [messages, statusFilter, searchQuery]);

  const columns = [
    {
      header: "Contact Info",
      accessor: (row) => (
        <div>
          <p className="font-bold text-graphite">{row.fullName}</p>
          <p className="text-xs text-cloud">{row.email}</p>
          {row.phone && <p className="text-xs text-cloud">{row.phone}</p>}
        </div>
      )
    },
    {
      header: "Clinic / Service",
      accessor: (row) => (
        <div>
          <p className="font-medium text-graphite">{row.clinicName}</p>
          {row.interestedService && <p className="text-xs text-cloud">{row.interestedService}</p>}
        </div>
      )
    },
    {
      header: "Status",
      accessor: (row) => (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
          row.status === "New" ? 
          "bg-blue-100 text-blue-700 border border-blue-200" : 
          "bg-[#f7f7f7] text-cloud border border-lightgray"
        }`}>
          {row.status.toUpperCase()}
        </span>
      )
    },
    {
      header: "Received",
      accessor: (row) => new Date(row.createdAt).toLocaleDateString() + " " + new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <button onClick={() => setViewingMessage(row)} className="text-graphite hover:text-black transition-colors text-sm font-medium">View</button>
          {row.status === "New" && (
            <button 
              onClick={() => handleMarkAsRead(row._id)} 
              disabled={updateStatusMutation.isPending}
              className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              Mark Read
            </button>
          )}
          <button 
            onClick={() => handleDelete(row._id)} 
            disabled={deleteMutation.isPending}
            className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      ),
      className: "w-48"
    }
  ];

  return (
    <>
      <Reveal variant="up">
        <AdminPageHeader 
          title="Messages" 
          subtitle="View and manage consultation requests."
          // Removed actionLabel as we don't "Create" a message from admin
        />

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cloud" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-lightgray rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-graphite transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {['All', 'New', 'Read'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === status ? 'bg-graphite text-white shadow-md' : 'bg-white text-graphite border border-lightgray hover:bg-gray-50'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <svg className="animate-spin h-8 w-8 text-graphite" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-lightgray overflow-hidden">
            <DataTable 
              columns={columns} 
              data={filteredMessages} 
              keyExtractor={(row) => row._id} 
            />
            {filteredMessages.length === 0 && (
              <div className="text-center p-8 text-cloud">
                No messages found.
              </div>
            )}
          </div>
        )}
      </Reveal>

      {/* View Message Modal */}
      <AnimatePresence>
        {viewingMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite/40 backdrop-blur-sm"
              onClick={() => setViewingMessage(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-lightgray flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="text-xl font-display font-bold text-graphite">Message Details</h3>
                  <p className="text-xs text-cloud mt-1">{new Date(viewingMessage.createdAt).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => setViewingMessage(null)}
                  className="text-cloud hover:text-graphite transition-colors bg-white p-2 rounded-full border border-lightgray shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-cloud mb-1 tracking-wider">Contact Info</h4>
                    <p className="font-medium text-graphite">{viewingMessage.fullName}</p>
                    <a href={`mailto:${viewingMessage.email}`} className="text-blue-600 text-sm hover:underline block mt-1">{viewingMessage.email}</a>
                    {viewingMessage.phone && <a href={`tel:${viewingMessage.phone}`} className="text-graphite text-sm block mt-1">{viewingMessage.phone}</a>}
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-cloud mb-1 tracking-wider">Practice Details</h4>
                    <p className="font-medium text-graphite">{viewingMessage.clinicName}</p>
                    <p className="text-sm text-cloud mt-1">{viewingMessage.interestedService || "N/A"}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-mono uppercase text-cloud mb-2 tracking-wider">Message Content</h4>
                  <div className="bg-gray-50 p-4 rounded-xl border border-lightgray">
                    <p className="text-graphite whitespace-pre-wrap text-sm leading-relaxed">
                      {viewingMessage.message || <span className="text-cloud italic">No message provided.</span>}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-lightgray bg-gray-50 flex justify-end gap-3">
                {viewingMessage.status === "New" && (
                  <button 
                    onClick={() => { handleMarkAsRead(viewingMessage._id); setViewingMessage(null); }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                  >
                    Mark as Read
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(viewingMessage._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                  Delete Message
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
