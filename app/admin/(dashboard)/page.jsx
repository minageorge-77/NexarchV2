"use client";

import { useQuery } from "@tanstack/react-query";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Reveal from "@/components/Reveal";
import { analyticsApi } from "@/lib/api/analytics";

export default function AnalyticsDashboardPage() {
  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: () => analyticsApi.getOverview()
  });

  const { data: trafficSources, isLoading: trafficLoading } = useQuery({
    queryKey: ["analytics", "traffic-sources"],
    queryFn: () => analyticsApi.getTrafficSources()
  });

  // Calculate percentages for traffic sources
  const totalTrafficSessions = trafficSources?.reduce((acc, src) => acc + parseInt(src.sessions, 10), 0) || 1;

  const mockMetrics = [
  { label: "Total Users", value: overview?.users || "0", change: "+0%", positive: true },
  { label: "Sessions", value: overview?.sessions || "0", change: "+0%", positive: true },
  { label: "Engagement Rate", value: overview?.engagementRate ? `${(overview.engagementRate * 100).toFixed(1)}%` : "0%", change: "0%", positive: true },
  { label: "New Consults", value: "-", change: "N/A", positive: true }];


  return (
    <>
      <Reveal variant="up">
        <AdminPageHeader
          title="Analytics Overview"
          subtitle="Real-time performance metrics powered by Google Analytics 4." />
        

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockMetrics.map((metric, idx) =>
          <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-card flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-outline mb-2">
                {metric.label}
              </span>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-3xl font-display font-extrabold text-on-surface leading-none">
                  {overviewLoading ? "..." : metric.value}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Charts & Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Placeholder */}
          <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-card min-h-[400px] flex flex-col">
            <h3 className="font-display font-bold text-lg text-on-surface mb-6">User Acquisition Trend (30 Days)</h3>
            <div className="flex-1 flex items-center justify-center relative">
              {/* CSS Mock Chart Grid */}
              <div className="absolute inset-0 flex flex-col justify-between py-4">
                {[...Array(5)].map((_, i) =>
                <div key={i} className="border-b border-outline-variant/30 w-full h-0"></div>
                )}
              </div>
              
              {/* Mock Bar Chart using simple divs */}
              <div className="absolute inset-0 pt-4 px-4 flex items-end justify-between gap-2">
                {[40, 60, 45, 80, 55, 90, 75, 100, 85, 65, 50, 70].map((height, i) =>
                <div key={i} className="w-full bg-lime/20 rounded-t-sm relative group transition-all hover:bg-lime/40" style={{ height: `${height}%` }}>
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-lime rounded-t-sm"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Traffic Sources Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-card flex flex-col">
            <h3 className="font-display font-bold text-lg text-on-surface mb-6">Traffic Sources</h3>
            <div className="flex-1 space-y-6">
              {trafficLoading ?
              <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-2 bg-outline-variant rounded"></div>
                    <div className="h-2 bg-outline-variant rounded w-5/6"></div>
                    <div className="h-2 bg-outline-variant rounded"></div>
                  </div>
                </div> :
              trafficSources?.length ?
              trafficSources.slice(0, 5).map((source, idx) => {
                const percentage = (parseInt(source.sessions, 10) / totalTrafficSessions * 100).toFixed(1);
                return (
                  <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-on-surface truncate pr-2">{source.sourceMedium}</span>
                        <span className="font-mono text-[11px] text-outline">{source.sessions}</span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div className="bg-lime h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>);

              }) :

              <p className="text-sm text-on-surface-variant">No traffic data available.</p>
              }
            </div>
          </div>

        </div>
      </Reveal>
    </>);

}