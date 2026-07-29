"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Reveal from "@/components/Reveal";
import { analyticsApi } from "@/lib/api/analytics";
import { messagesApi } from "@/lib/api/messages";
import { servicesApi } from "@/lib/api/services";
import { testimonialsApi } from "@/lib/api/testimonials";

export default function AnalyticsDashboardPage() {
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
            <span className="font-mono text-[11px] uppercase tracking-wider text-cloud mb-2">Total Visitors</span>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-display font-extrabold text-graphite leading-none">
                {overviewLoading ? "..." : overview?.users || "0"}
              </span>
            </div>
          </div>

          {/* Contact Requests */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-cloud mb-2">Contact Requests</span>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-display font-extrabold text-graphite leading-none">
                {messagesLoading ? "..." : Array.isArray(messages) ? messages.length : "0"}
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-cloud mb-2">Active Services</span>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-display font-extrabold text-graphite leading-none">
                {servicesLoading ? "..." : Array.isArray(services) ? services.length : "0"}
              </span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-cloud mb-2">Testimonials</span>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-display font-extrabold text-graphite leading-none">
                {testimonialsLoading ? "..." : Array.isArray(testimonials) ? testimonials.length : "0"}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Quick Actions & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* 4. Quick Actions */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card flex flex-col justify-between">
            <h3 className="font-display font-bold text-lg text-graphite mb-6">Quick Actions</h3>
            <div className="flex flex-col gap-3">
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
                    <span className="text-cloud font-mono text-[11px] whitespace-nowrap">{page.sessions} views</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-cloud">No page data available.</p>
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
                        <span className="font-mono text-[11px] text-cloud">{source.sessions}</span>
                      </div>
                      <div className="w-full bg-[#f7f7f7] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-graphite h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-cloud">No traffic data available.</p>
              )}
            </div>
          </div>
        </div>

        {/* 3. Recent Contact Requests */}
        <div className="bg-white border border-lightgray rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-lightgray flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="font-display font-bold text-lg text-graphite">Recent Contact Requests</h3>
              <p className="text-xs text-cloud mt-0.5">Latest consultation form submissions</p>
            </div>
            <Link href="/admin/messages" className="text-xs font-mono uppercase tracking-wider text-graphite hover:text-black font-bold underline transition-colors">
              View All Messages →
            </Link>
          </div>

          {messagesLoading ? (
            <div className="p-8 text-center text-cloud text-sm">Loading messages...</div>
          ) : recentMessages.length > 0 ? (
            <div>
              {/* Desktop/Tablet Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f7f7f7] text-[10px] uppercase tracking-wider font-mono text-cloud border-b border-lightgray">
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
                        <td className="py-4 px-6 text-cloud whitespace-nowrap">
                          <a href={`mailto:${msg.email}`} className="hover:text-graphite transition-colors">{msg.email}</a>
                        </td>
                        <td className="py-4 px-6 text-cloud whitespace-nowrap">{msg.phone || '-'}</td>
                        <td className="py-4 px-6 text-cloud whitespace-nowrap">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            msg.status === "New" 
                              ? "bg-blue-100 text-blue-700 border border-blue-200" 
                              : "bg-gray-100 text-cloud border border-lightgray"
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
                        <p className="text-xs text-cloud">{msg.clinicName}</p>
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        msg.status === "New" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-cloud"
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <div className="text-xs text-cloud space-y-1 pt-1">
                      <p>✉️ <a href={`mailto:${msg.email}`} className="underline">{msg.email}</a></p>
                      {msg.phone && <p>📞 {msg.phone}</p>}
                      <p className="text-[10px] font-mono text-cloud/70 pt-1">
                        📅 {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-cloud text-sm">
              No recent contact requests.
            </div>
          )}
        </div>

      </Reveal>
    </>
  );
}