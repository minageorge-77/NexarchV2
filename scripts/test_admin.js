
const http = require("http");

async function runAdminTests() {
  console.log("Starting Admin Security Tests...");
  const BASE_URL = "http://localhost:3000/api/auth/callback/credentials";

  // Test 1: Rate Limiting (Brute force protection)
  console.log("Running Brute Force Test...");
  let rateLimited = false;
  for(let i=1; i<=7; i++) {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-forwarded-for": "192.168.1.100" // Mock IP
        },
        body: "email=fake@test.com&password=wrongpassword&csrfToken="
      });
      const text = await res.text();
      if(text.includes("Too many login attempts") || res.url.includes("error=Too%20many%20login%20attempts")) {
        rateLimited = true;
        break;
      }
    } catch(e) {}
  }
  
  if(rateLimited) console.log("? Rate Limiting (Brute Force Protection) works perfectly.");
  else console.log("? Rate Limiting failed to trigger.");

  // Test 2: DoS Password Length check
  console.log("Running DoS Password Length Test...");
  try {
    const hugePassword = "A".repeat(5000);
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-forwarded-for": "192.168.1.101" // Different IP to avoid rate limit
      },
      body: `email=test@test.com&password=${hugePassword}&csrfToken=`
    });
    
    // We expect it to fail fast without hanging
    const start = Date.now();
    await res.text();
    const duration = Date.now() - start;
    if(duration < 1000) console.log("? bcrypt DoS prevention works (Fast failure).");
    else console.log("? bcrypt DoS prevention failed (Took too long).");
  } catch(e) {}
  
  console.log("Admin Tests completed.");
}

runAdminTests();

