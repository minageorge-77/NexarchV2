# NexArch V2 - Hostinger VPS (KVM1) Deployment Guide

This guide outlines the steps to deploy the NexArch Next.js application to a Hostinger VPS (Ubuntu Linux) using PM2 and Nginx.

## Prerequisites
- Hostinger VPS (KVM1) with Ubuntu (20.04 or 22.04 recommended).
- SSH access to the VPS.
- Domain name (`nexarch.co`) pointed to your VPS IP address.

## 1. Initial VPS Setup

Connect to your VPS via SSH:
```bash
ssh root@<YOUR_VPS_IP>
```

Update system packages:
```bash
apt update && apt upgrade -y
```

Install Node.js (v20 is recommended for Next.js 14):
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

Install PM2 globally:
```bash
npm install -g pm2
```

Install Nginx:
```bash
apt install -y nginx
```

## 2. Project Setup

Create a directory for your application and clone your repository (or copy your files using SCP/rsync):
```bash
mkdir -p /var/www/nexarch
cd /var/www/nexarch
# Clone your repo or copy the contents of the `implementation/nexarch` directory here.
# git clone <YOUR_REPO_URL> .
```

Copy the `.env.local` to the server (make sure to set your production variables):
```bash
nano .env.local
```
Ensure your `.env.local` includes:
```env
MONGODB_URI=your_production_mongodb_connection_string
NEXT_PUBLIC_SITE_URL=https://nexarch.co
# Add other necessary variables (Cloudinary, NextAuth secrets, etc.)
```

Install dependencies:
```bash
npm install
```

Build the application for production:
```bash
npm run build
```

## 3. Configure PM2

Start the application with PM2:
```bash
pm2 start npm --name "nexarch" -- run start -- -p 3000
```

Ensure PM2 starts on server boot:
```bash
pm2 startup
pm2 save
```

## 4. Configure Nginx (Reverse Proxy)

Create a new Nginx configuration file for your domain:
```bash
nano /etc/nginx/sites-available/nexarch.co
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name nexarch.co www.nexarch.co;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and test the configuration:
```bash
ln -s /etc/nginx/sites-available/nexarch.co /etc/nginx/sites-enabled/
nginx -t
```

Restart Nginx:
```bash
systemctl restart nginx
```

## 5. Enable HTTPS (SSL/TLS)

Install Certbot for Nginx:
```bash
apt install -y certbot python3-certbot-nginx
```

Obtain and install an SSL certificate:
```bash
certbot --nginx -d nexarch.co -d www.nexarch.co
```
Follow the prompts to configure the certificate. Certbot will automatically update your Nginx configuration to use HTTPS and handle renewals.

## 6. Final Checks

1. Open `https://nexarch.co` in your browser.
2. The application should load securely over HTTPS.
3. Test your contact form and any admin functionality to ensure everything works correctly in the production environment.
