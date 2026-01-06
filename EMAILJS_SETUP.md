# EmailJS Setup Instructions

The contact form on your website uses EmailJS to send form submissions directly to your email address: **btslender@dirtdudesexcavating.com**

## Quick Setup Steps

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Click "Sign Up" and create a free account (free tier allows 200 emails/month)

### 2. Add Email Service
- In EmailJS Dashboard, go to **Email Services**
- Click **Add New Service**
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the connection steps to link your email account
- **Note the Service ID** (e.g., `service_xxxxxxx`)

### 3. Create Email Template
- Go to **Email Templates** in the dashboard
- Click **Create New Template**
- Use this template structure:

**Subject:**
```
New Contact Form Submission: {{subject}}
```

**Content:**
```
You have received a new contact form submission from your website.

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
Submitted on: {{timestamp}}
Reply to: {{from_email}}
```

- Set **To Email** to: `btslender@dirtdudesexcavating.com`
- Set **From Name** to: `{{from_name}}`
- Set **Reply To** to: `{{reply_to}}`
- **Note the Template ID** (e.g., `template_xxxxxxx`)

### 4. Get Your Public Key
- Go to **Account** > **General**
- Find your **Public Key** (e.g., `xxxxxxxxxxxxxxxx`)

### 5. Update the Code
- Open `js/form-handler.js`
- Find these lines (around line 200):
```javascript
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```
- Replace with your actual values:
```javascript
const SERVICE_ID = 'service_xxxxxxx'; // Your actual service ID
const TEMPLATE_ID = 'template_xxxxxxx'; // Your actual template ID
const PUBLIC_KEY = 'xxxxxxxxxxxxxxxx'; // Your actual public key
```

### 6. Test the Form
- Go to your website
- Fill out the contact form
- Submit it
- Check your email at btslender@dirtdudesexcavating.com

## Troubleshooting

**Form shows error message:**
- Make sure all three values (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY) are updated
- Check that your EmailJS service is connected and active
- Verify the template variable names match exactly (case-sensitive)

**Emails not arriving:**
- Check spam/junk folder
- Verify the "To Email" in your template is correct
- Check EmailJS dashboard for error logs
- Make sure you haven't exceeded the free tier limit (200 emails/month)

**Need more emails?**
- EmailJS free tier: 200 emails/month
- Paid plans start at $15/month for 1,000 emails

## Alternative: Direct Email (No Setup Required)

If you prefer not to use EmailJS, you can use a simple mailto: link, but this requires the user's email client to be configured. This is less reliable but requires no setup.
