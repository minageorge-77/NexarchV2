"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Reveal from "@/components/Reveal";
import { analyticsApi } from "@/lib/api/analytics";
import { messagesApi } from "@/lib/api/messages";
import { servicesApi } from "@/lib/api/services";
import { testimonialsApi } from "@/lib/api/testimonials";
import { statsApi } from "@/lib/api/stats";
import StatsModal from "@/components/admin/modals/StatsModal";

export default function AnalyticsDashboardPage() {
  const queryClient = useQueryClient();
  const [statsModalOpen, setStatsModalOpen] = useState(false);

  // Fetch Analytics
  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: () => analyticsApi.getOverview()
  });

  const { data: topPages, isLoading: topPagesLoading } = useQuery({
    queryKey: ["analytics", "top-pages"],
    queryFn: () => analyticsApi.getTopPages()
  });

  const { data: trafficSources, isLoading: trafficLoading } = useQuery({
    queryKey: ["analytics", "traffic-sources"],
    queryFn: () => analyticsApi.getTrafficSources()
  });

  // Fetch DB Entities
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: messagesApi.list
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.list
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: testimonialsApi.list
  });

  // Fetch Landing Page Live Stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: statsApi.get
  });

  // Update Stats Mutation
  const updateStatsMutation = useMutation({
    mutationFn: statsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Landing page stats updated successfully!");
      setStatsModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to update stats");
    }
  });

  // Derived Metrics & Safe Checks
  const totalTrafficSessions = Array.isArray(trafficSources) 
    ? trafficSources.reduce((acc, src) => acc + parseInt(src.sessions?.replace(/,/g, '') || '0', 10), 0) || 1
    : 1;

  const recentMessages = Array.isArray(messages) ? messages.slice(0, 5) : [];

  return (
    <>
      <Reveal variant="up">
        <AdminPageHeader
          title="Admin Dashboard"
          subtitle="A quick overview of your website's performance and recent activity." 
        />
        
        {/* 1. Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Visitors */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-clinical mb-2">Total Visitors</span>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-display font-extrabold text-graphite leading-none">
                {overviewLoading ? "..." : overview?.users || "0"}
              </span>
            </div>
          </div>

          {/* Contact Requests */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-clinical mb-2">Contact Requests</span>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-display font-extrabold text-graphite leading-none">
                {messagesLoading ? "..." : Array.isArray(messages) ? messages.length : "0"}
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-clinical mb-2">Active Services</span>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-display font-extrabold text-graphite leading-none">
                {servicesLoading ? "..." : Array.isArray(services) ? services.length : "0"}
              </span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-clinical mb-2">Testimonials</span>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-display font-extrabold text-graphite leading-none">
                {testimonialsLoading ? "..." : Array.isArray(testimonials) ? testimonials.length : "0"}
              </span>
            </div>
          </div>
        </div>

        {/* Landing Page Live Stats Highlight Card */}
        <div className="bg-white border border-lightgray rounded-2xl p-5 sm:p-7 lg:p-8 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-lightgray">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse shrink-0"></span>
                <h3 className="font-display font-bold text-lg text-graphite">Landing Page Results & Case Study</h3>
              </div>
              <p className="text-xs text-clinical mt-1">
                Customize the photo, practice name, and animated counters featured on the public landing page.
              </p>
            </div>
            <button
              onClick={() => setStatsModalOpen(true)}
              className="btn-primary bg-gold hover:bg-gold/90 text-graphite font-bold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm w-full sm:w-auto shadow-sm shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Photo & Numbers
            </button>
          </div>

          <div className="pt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
            {/* Featured Photo Preview */}
            <div className="lg:col-span-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-clinical block mb-2 font-bold">
                Featured Photo
              </span>
              <div className="relative h-32 sm:h-36 rounded-xl overflow-hidden border border-lightgray bg-[#f7f7f7]">
                <Image
                  src={stats?.featuredImageUrl || "/results.png"}
                  alt="Featured Case Study"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 250px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] font-bold truncate">
                  {stats?.featuredClinicName || "Summit Implant & Oral Surgery"}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#f7f7f7] border border-lightgray/60 rounded-xl p-4 text-center">
                <span className="font-mono text-[10px] uppercase tracking-wider text-clinical block mb-1">
                  {stats?.implantLeadsLabel || "Implant Leads"}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-graphite block truncate">
                  {statsLoading ? "..." : (stats?.implantLeads ?? 412).toLocaleString()}
                </span>
                <span className="text-[11px] text-clinical mt-1 block">Live on landing page</span>
              </div>

              <div className="bg-[#f7f7f7] border border-lightgray/60 rounded-xl p-4 text-center">
                <span className="font-mono text-[10px] uppercase tracking-wider text-clinical block mb-1">
                  {stats?.consultationsLabel || "Consultations"}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-graphite block truncate">
                  {statsLoading ? "..." : (stats?.consultations ?? 158).toLocaleString()}
                </span>
                <span className="text-[11px] text-clinical mt-1 block">Live on landing page</span>
              </div>

              <div className="bg-[#f7f7f7] border border-lightgray/60 rounded-xl p-4 text-center">
                <span className="font-mono text-[10px] uppercase tracking-wider text-clinical block mb-1">
                  {stats?.monthlyProductionLabel || "Monthly production"}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-graphite block truncate">
                  {statsLoading ? "..." : `$${(stats?.monthlyProduction ?? 48920).toLocaleString()}`}
                </span>
                <span className="text-[11px] text-clinical mt-1 block">Live on landing page</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Quick Actions & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Quick Actions */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col justify-between">
            <h3 className="font-display font-bold text-lg text-graphite mb-6">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setStatsModalOpen(true)}
                className="px-4 py-3 bg-gold/15 hover:bg-gold/25 text-graphite border border-gold/40 rounded-xl font-bold transition-colors text-center text-sm flex items-center justify-center gap-2"
              >
                <span>⚡</span> Edit Live Stats (Landing Page)
              </button>
              <Link href="/admin/services" className="px-4 py-3 bg-[#f7f7f7] hover:bg-lightgray text-graphite rounded-xl font-medium transition-colors text-center border border-lightgray text-sm">
                Add Service
              </Link>
              <Link href="/admin/testimonials" className="px-4 py-3 bg-[#f7f7f7] hover:bg-lightgray text-graphite rounded-xl font-medium transition-colors text-center border border-lightgray text-sm">
                Add Testimonial
              </Link>
              <Link href="/admin/messages" className="px-4 py-3 bg-graphite hover:bg-black text-white rounded-xl font-medium transition-colors text-center text-sm">
                View Messages
              </Link>
            </div>
          </div>

          {/* 2. Analytics Summary - Top Pages */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col">
            <h3 className="font-display font-bold text-lg text-graphite mb-6">Top 5 Pages</h3>
            <div className="flex-1 space-y-4">
              {topPagesLoading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-lightgray/50 rounded w-full"></div>)}
                </div>
              ) : Array.isArray(topPages) && topPages.length ? (
                topPages.slice(0, 5).map((page, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-graphite font-medium truncate pr-4">{page.pagePath}</span>
                    <span className="text-clinical font-mono text-[11px] whitespace-nowrap">{page.sessions} views</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-clinical">No page data available.</p>
              )}
            </div>
          </div>

          {/* 2. Analytics Summary - Traffic Sources */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col">
            <h3 className="font-display font-bold text-lg text-graphite mb-6">Traffic Sources</h3>
            <div className="flex-1 space-y-5">
              {trafficLoading ? (
                <div className="animate-pulse space-y-5">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-4 bg-lightgray/50 rounded w-full"></div>)}
                </div>
              ) : Array.isArray(trafficSources) && trafficSources.length ? (
                trafficSources.slice(0, 5).map((source, idx) => {
                  const sessNum = parseInt(source.sessions?.replace(/,/g, '') || '0', 10);
                  const percentage = Math.min(100, Math.max(5, (sessNum / totalTrafficSessions * 100))).toFixed(1);
                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium text-graphite truncate pr-2">{source.sourceMedium}</span>
                        <span className="font-mono text-[11px] text-clinical">{source.sessions}</span>
                      </div>
                      <div className="w-full bg-[#f7f7f7] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-graphite h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-clinical">No traffic data available.</p>
              )}
            </div>
          </div>
        </div>

        {/* 3. Recent Contact Requests */}
        <div className="bg-white border border-lightgray rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-lightgray flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="font-display font-bold text-lg text-graphite">Recent Contact Requests</h3>
              <p className="text-xs text-clinical mt-0.5">Latest consultation form submissions</p>
            </div>
            <Link href="/admin/messages" className="text-xs font-mono uppercase tracking-wider text-graphite hover:text-black font-bold underline transition-colors">
              View All Messages →
            </Link>
          </div>

          {messagesLoading ? (
            <div className="p-8 text-center text-clinical text-sm">Loading messages...</div>
          ) : recentMessages.length > 0 ? (
            <div>
              {/* Desktop/Tablet Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f7f7f7] text-[10px] uppercase tracking-wider font-mono text-clinical border-b border-lightgray">
                      <th className="py-3.5 px-6 font-semibold">Name</th>
                      <th className="py-3.5 px-6 font-semibold">Clinic</th>
                      <th className="py-3.5 px-6 font-semibold">Email</th>
                      <th className="py-3.5 px-6 font-semibold">Phone</th>
                      <th className="py-3.5 px-6 font-semibold">Date</th>
                      <th className="py-3.5 px-6 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lightgray text-sm">
                    {recentMessages.map((msg) => (
                      <tr key={msg._id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 px-6 font-medium text-graphite whitespace-nowrap">{msg.fullName}</td>
                        <td className="py-4 px-6 text-graphite whitespace-nowrap">{msg.clinicName}</td>
                        <td className="py-4 px-6 text-clinical whitespace-nowrap">
                          <a href={`mailto:${msg.email}`} className="hover:text-graphite transition-colors">{msg.email}</a>
                        </td>
                        <td className="py-4 px-6 text-clinical whitespace-nowrap">{msg.phone || '-'}</td>
                        <td className="py-4 px-6 text-clinical whitespace-nowrap">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            msg.status === "New" 
                              ? "bg-blue-100 text-blue-700 border border-blue-200" 
                              : "bg-gray-100 text-clinical border border-lightgray"
                          }`}>
                            {msg.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="block sm:hidden divide-y divide-lightgray">
                {recentMessages.map((msg) => (
                  <div key={msg._id} className="p-4 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-bold text-graphite text-sm">{msg.fullName}</h4>
                        <p className="text-xs text-clinical">{msg.clinicName}</p>
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        msg.status === "New" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-clinical"
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <div className="text-xs text-clinical space-y-1 pt-1">
                      <p>✉️ <a href={`mailto:${msg.email}`} className="underline">{msg.email}</a></p>
                      {msg.phone && <p>📞 {msg.phone}</p>}
                      <p className="text-[10px] font-mono text-clinical/70 pt-1">
                        📅 {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-clinical text-sm">
              No recent contact requests.
            </div>
          )}
        </div>

      </Reveal>

      {/* Stats Edit Modal */}
      <StatsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        stats={stats}
        onSave={updateStatsMutation.mutate}
        isSaving={updateStatsMutation.isPending}
      />
    </>
  );
}
