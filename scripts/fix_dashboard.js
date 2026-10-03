const fs = require('fs');
const path = require('path');
const file = "d:\\work\\real projects\\NexarchV2\\implementation\\nexarch\\app\\admin\\(dashboard)\\page.jsx";
let content = fs.readFileSync(file, 'utf8');

const lines = content.split('\n');

// We want to slice out lines 162 to 238, which is index 161 to 237.
// Wait, I should double check what's inside.
// Actually, let's keep the Quick Actions but change the grid.
const replacement = `        {/* Middle Section: Quick Actions */}
        <div className="mb-8">
          {/* Quick Actions */}
          <div className="bg-white border border-lightgray rounded-2xl p-6 shadow-card">
            <h3 className="font-display font-bold text-lg text-graphite mb-6">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStatsModalOpen(true)}
                className="flex-1 px-4 py-3 bg-gold/15 hover:bg-gold/25 text-graphite border border-gold/40 rounded-xl font-bold transition-colors text-center text-sm flex items-center justify-center gap-2"
              >
                <span>✨</span> Edit Live Stats (Landing Page)
              </button>
              <Link href="/admin/services" className="flex-1 px-4 py-3 bg-[#f7f7f7] hover:bg-lightgray text-graphite rounded-xl font-medium transition-colors text-center border border-lightgray text-sm">
                Add Service
              </Link>
              <Link href="/admin/testimonials" className="flex-1 px-4 py-3 bg-[#f7f7f7] hover:bg-lightgray text-graphite rounded-xl font-medium transition-colors text-center border border-lightgray text-sm">
                Add Testimonial
              </Link>
              <Link href="/admin/messages" className="flex-1 px-4 py-3 bg-graphite hover:bg-black text-white rounded-xl font-medium transition-colors text-center text-sm">
                View Messages
              </Link>
            </div>
          </div>
        </div>
`;

// It's safer to use regex replacement on the exact content so we don't mess up line numbers if they shifted.
const regex = /\{\/\* Middle Section: Quick Actions & Analytics \*\/\}(.|\n)*?(?=\{\/\* 3\. Recent Contact Requests \*\/\})/;
content = content.replace(regex, replacement + '\n');
fs.writeFileSync(file, content);
console.log("Replaced middle section.");
