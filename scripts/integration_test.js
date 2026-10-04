
const http = require("http");

async function runTests() {
  console.log("Starting API Integration and Security Flow Tests...");
  const BASE_URL = "http://localhost:3000/api";

  // 1. Test public tracking endpoint
  try {
    const trackRes = await fetch(BASE_URL + "/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "/test-page", sessionId: "test-session-123" })
    });
    const trackData = await trackRes.json();
    if(trackData.success) console.log("? Analytics tracking passed");
    else console.log("? Analytics tracking failed");
  } catch(e) { console.log("? Analytics tracking failed:", e.message); }

  // 2. Test contact form with invalid data (should fail Zod validation)
  try {
    const badContactRes = await fetch(BASE_URL + "/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: "123", email: "invalid", clinicName: "A" })
    });
    if(badContactRes.status === 400) console.log("? Contact form validation (bad data) blocked properly");
    else console.log("? Contact form validation failed to block bad data");
  } catch(e) { console.log("? Contact form validation error:", e.message); }

  // 3. Test contact form with valid data
  try {
    const goodContactRes = await fetch(BASE_URL + "/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        fullName: "Test User", 
        email: "test@nexarch.co", 
        clinicName: "Test Clinic", 
        phone: "1234567", 
        monthlyEnquiries: "15", 
        message: "Integration test message" 
      })
    });
    const goodData = await goodContactRes.json();
    if(goodData.success) console.log("? Contact form successful submission passed");
    else console.log("? Contact form successful submission failed:", goodData.message);
  } catch(e) { console.log("? Contact form submission error:", e.message); }

  // 4. Test accessing protected routes without auth (should fail)
  try {
    const protectedRes = await fetch(BASE_URL + "/messages");
    if(protectedRes.status === 401 || protectedRes.url.includes("login")) console.log("? Protected routes blocked without auth (Security)");
    else console.log("? Protected routes exposed without auth!");
  } catch(e) { console.log("? Security check error:", e.message); }
  
  console.log("Integration Tests completed.");
}

runTests();

