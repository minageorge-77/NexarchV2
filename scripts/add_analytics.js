const fs = require('fs');

const file = "d:\\work\\real projects\\NexarchV2\\implementation\\nexarch\\app\\admin\\(dashboard)\\page.jsx";
let content = fs.readFileSync(file, 'utf8');

// Ensure import { analyticsApi } from "@/lib/api/analytics";
if (!content.includes('import { analyticsApi } from "@/lib/api/analytics";')) {
  content = content.replace(
    'import { statsApi } from "@/lib/api/stats";',
    'import { statsApi } from "@/lib/api/stats";\nimport { analyticsApi } from "@/lib/api/analytics";'
  );
}

// Add state for date filter
if (!content.includes('const [range, setRange] = useState("last30");')) {
  content = content.replace(
    'const [statsModalOpen, setStatsModalOpen] = useState(false);',
    'const [statsModalOpen, setStatsModalOpen] = useState(false);\n  const [range, setRange] = useState("last30");'
  );
}

// Add analytics query
if (!content.includes('const { data: analyticsData, isLoading: analyticsLoading } = useQuery')) {
  content = content.replace(
    '// Fetch DB Entities',
    `// Fetch Analytics\n  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({\n    queryKey: ["analytics", range],\n    queryFn: () => analyticsApi.getStats(range)\n  });\n\n  // Fetch DB Entities`
  );
}

// Add analytics UI
const analyticsUI = `
        {/* Simple Analytics Section */}
        <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-lightgray">
            <div>
              <h3 className="font-display font-bold text-lg text-graphite">Website Traffic</h3>
              <p className="text-xs text-clinical mt-1">Basic page views recorded directly in your database.</p>
            </div>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="text-sm border border-lightgray rounded-lg px-3 py-2 bg-[#f7f7f7] text-graphite font-medium focus:outline-none focus:border-gold"
            >
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
            </select>
          </div>

          {analyticsLoading ? (
             <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => <div key={i} className="h-10 bg-lightgray/50 rounded w-full"></div>)}
             </div>
          ) : (
            <div className="space-y-8">
              {/* Overview Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#f7f7f7] rounded-xl p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-clinical block mb-1">Total Views</span>
                  <span className="text-2xl font-display font-bold text-graphite">{analyticsData?.overview?.totalViews || 0}</span>
                </div>
                <div className="bg-[#f7f7f7] rounded-xl p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-clinical block mb-1">Unique Sessions</span>
                  <span className="text-2xl font-display font-bold text-graphite">{analyticsData?.overview?.uniqueSessions || 0}</span>
                </div>
                <div className="bg-[#f7f7f7] rounded-xl p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-clinical block mb-1">Today</span>
                  <span className="text-2xl font-display font-bold text-graphite">{analyticsData?.overview?.todayViews || 0}</span>
                </div>
                <div className="bg-[#f7f7f7] rounded-xl p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-clinical block mb-1">Last 7 Days</span>
                  <span className="text-2xl font-display font-bold text-graphite">{analyticsData?.overview?.last7DaysViews || 0}</span>
                </div>
              </div>

              {/* Top Pages */}
              <div>
                <h4 className="font-display font-bold text-md text-graphite mb-3">Top Pages</h4>
                <div className="border border-lightgray rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f7f7f7] text-[10px] uppercase tracking-wider font-mono text-clinical border-b border-lightgray">
                        <th className="py-2.5 px-4 font-semibold">Page Path</th>
                        <th className="py-2.5 px-4 font-semibold text-right">Views</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-lightgray text-sm">
                      {analyticsData?.topPages?.length > 0 ? (
                        analyticsData.topPages.map((page, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-2.5 px-4 font-medium text-graphite truncate">{page.path}</td>
                            <td className="py-2.5 px-4 text-clinical text-right">{page.views}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="2" className="py-4 text-center text-xs text-clinical">No views found for this period.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Views Over Time (Simple Bar Visualization) */}
              <div>
                <h4 className="font-display font-bold text-md text-graphite mb-3">Views Over Time</h4>
                <div className="flex items-end gap-1 h-32 border-b border-lightgray pb-1 px-1">
                  {analyticsData?.viewsOverTime?.length > 0 ? (
                    analyticsData.viewsOverTime.map((day, idx) => {
                      const maxViews = Math.max(...analyticsData.viewsOverTime.map(d => d.views));
                      const height = Math.max(5, (day.views / (maxViews || 1)) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-pointer h-full justify-end">
                          <div className="w-full bg-gold/60 group-hover:bg-gold rounded-t-sm transition-colors" style={{ height: \`\${height}%\` }}></div>
                          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-graphite text-white text-[10px] font-mono py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10 transition-opacity">
                            {day.date}: {day.views} views
                          </div>
                        </div>
                      )
                    })
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-xs text-clinical">Not enough data to display chart.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
`;

// Insert the UI just before `{/* Landing Page Live Stats Highlight Card */}`
if (!content.includes('{/* Simple Analytics Section */}')) {
  content = content.replace(
    '{/* Landing Page Live Stats Highlight Card */}',
    analyticsUI + '\n        {/* Landing Page Live Stats Highlight Card */}'
  );
}

fs.writeFileSync(file, content);
console.log("Analytics integrated into dashboard!");
