const http = require('http');

const data = JSON.stringify({
  path: '/',
  sessionId: 'test-session-123'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/analytics/track',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
});

req.write(data);
req.end();
