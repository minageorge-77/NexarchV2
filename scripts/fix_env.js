const fs = require('fs');

const envPath = "d:\\work\\real projects\\NexarchV2\\implementation\\nexarch\\.env.local";
let content = fs.readFileSync(envPath, 'utf8');

// Fix the mangled line
content = content.replace(
  'GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"RESEND_FROM_EMAIL=onboarding@resend.dev',
  'GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"\nRESEND_FROM_EMAIL="NexArch Notifications <notifications@nexarch.co>"'
);

// In case it was already fixed or different, make sure RESEND_FROM_EMAIL is set correctly
if (!content.includes('RESEND_FROM_EMAIL=')) {
  content += '\nRESEND_FROM_EMAIL="NexArch Notifications <notifications@nexarch.co>"\n';
} else {
  content = content.replace(/RESEND_FROM_EMAIL=.*/, 'RESEND_FROM_EMAIL="NexArch Notifications <notifications@nexarch.co>"');
}

fs.writeFileSync(envPath, content);
console.log("Updated .env.local with correct RESEND_FROM_EMAIL");
