const fs = require('fs');
const path = require('path');

const basePath = "d:\\work\\real projects\\NexarchV2\\implementation\\nexarch";

// 1. Delete app/api/analytics folder
const analyticsApiRoute = path.join(basePath, "app", "api", "analytics");
if (fs.existsSync(analyticsApiRoute)) {
  fs.rmSync(analyticsApiRoute, { recursive: true, force: true });
  console.log("Deleted app/api/analytics");
}

// 2. Delete lib/api/analytics.js
const libAnalytics = path.join(basePath, "lib", "api", "analytics.js");
if (fs.existsSync(libAnalytics)) {
  fs.unlinkSync(libAnalytics);
  console.log("Deleted lib/api/analytics.js");
}

// 3. Edit lib/site.js
const siteJsPath = path.join(basePath, "lib", "site.js");
if (fs.existsSync(siteJsPath)) {
  let siteJs = fs.readFileSync(siteJsPath, 'utf8');
  siteJs = siteJs.replace('and a GA4-powered analytics dashboard', 'and an analytics dashboard');
  fs.writeFileSync(siteJsPath, siteJs);
  console.log("Updated lib/site.js");
}

// 4. Edit app/admin/(dashboard)/page.jsx
const dashboardPath = path.join(basePath, "app", "admin", "(dashboard)", "page.jsx");
if (fs.existsSync(dashboardPath)) {
  let content = fs.readFileSync(dashboardPath, 'utf8');
  
  // Remove import
  content = content.replace(/import \{ analyticsApi \} from "@\/lib\/api\/analytics";\n?/, "");
  
  // Remove useQueries
  content = content.replace(/\/\/ Fetch Analytics[\s\S]*?(?=\/\/ Fetch DB Entities)/, "");
  
  // Remove totalTrafficSessions calculation
  content = content.replace(/const totalTrafficSessions =[\s\S]*?1;\n\n/, "");
  
  // Update grid classes for top cards
  content = content.replace(/className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"/, 'className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"');
  
  // Remove Total Visitors card
  content = content.replace(/{\/\* Total Visitors \*\/}[\s\S]*?{\/\* Contact Requests \*\//, '{/* Contact Requests */');

  // We had Quick Actions column and Analytics column. Let me just remove the entire <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"> where Analytics sits. Wait, is Quick Actions part of that grid?
  
  fs.writeFileSync(dashboardPath, content);
  console.log("Updated admin dashboard page part 1");
}
