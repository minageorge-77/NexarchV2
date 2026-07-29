# Contact Form Backend Feature

This project now includes a complete Contact Form Backend using Next.js Route Handlers, MongoDB, and Resend for email notifications.

## Requirements

To fully utilize this feature locally or in production, you need to configure your environment variables. 

Add the following to your `.env.local` file:

```env
# Resend API Key for sending emails
RESEND_API_KEY=re_123456789

# The email address that will receive the notification emails (Admin's Email)
ADMIN_NOTIFICATION_EMAIL=admin@yourdomain.com
```

## How to Set Up Resend

1. **Create an Account**: Go to [resend.com](https://resend.com) and sign up for a free account.
2. **Generate API Key**: 
   - Navigate to the **API Keys** section on the left sidebar.
   - Click **Create API Key**.
   - Give it a name (e.g., `NexArch Contact Form`) and give it "Sending Access".
   - Copy the generated API key and paste it as `RESEND_API_KEY` in your `.env.local` file.
3. **Verify Domain (Optional but Recommended)**: 
   - By default, you can only send emails from `onboarding@resend.dev` to the email address you signed up with. 
   - For production, navigate to **Domains**, add your domain, and verify it by adding the provided DNS records to your domain registrar.

## How to Test Locally

1. **Configure Environment Variables**: Ensure `RESEND_API_KEY` and `ADMIN_NOTIFICATION_EMAIL` are set in `.env.local`. Ensure your `MONGODB_URI` is also correct.
2. **Restart the Server**: If your development server is running, stop it (Ctrl+C) and restart it (`npm run dev`) so it picks up the new environment variables.
3. **Submit the Form**:
   - Go to `http://localhost:3000/contact`
   - Fill out the form with test data.
   - Click "Request Consultation".
4. **Verify MongoDB / Admin UI**:
   - Go to `http://localhost:3000/admin/messages`
   - You should see the new message listed. You can click "View", mark it as "Read", or delete it.
5. **Verify Email Delivery**:
   - Check the inbox of the email you set as `ADMIN_NOTIFICATION_EMAIL`. 
   - You should receive an email with the subject `New Consultation Request - NexArch`.

## Security Features Built-in

- **Zod Validation**: All fields are strictly validated before hitting the database.
- **In-Memory Rate Limiting**: Simple IP-based rate limiting prevents spam submissions (max 3 requests per minute).
- **Graceful Error Handling**: Even if the Resend API fails (e.g., missing API key), the message is still saved to MongoDB, ensuring no leads are lost.
