
const http = require("http");

async function testAuth() {
  console.log("Testing Admin Routes Security...");
  
  try {
    const res = await fetch("http://localhost:3000/admin");
    if(res.redirected && res.url.includes("login")) {
      console.log("? Admin Dashboard is protected (Redirected to login)");
    } else {
      console.log("? Admin Dashboard is exposed!");
    }

    const msgRes = await fetch("http://localhost:3000/admin/messages");
    if(msgRes.redirected && msgRes.url.includes("login")) {
      console.log("? Admin Messages route is protected (Redirected to login)");
    } else {
      console.log("? Admin Messages route is exposed!");
    }
  } catch(e) {
    console.log("? Error:", e.message);
  }
}
testAuth();

