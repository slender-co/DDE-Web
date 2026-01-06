# Auto-Reply Confirmation Email Setup Guide

This guide will walk you through setting up an automatic confirmation email that gets sent to users when they submit the contact form.

## Step 1: Create New Email Template in EmailJS

1. Go to **EmailJS Dashboard** → **Email Templates**
2. Click **"Create New Template"**
3. Name it something like: **"Contact Form Confirmation"**

## Step 2: Configure Template Settings

In the template settings:

1. **Content Type**: Select **"HTML"**
2. **To Email**: `{{to_email}}` (this will be the user's email)
3. **From Name**: `{{from_name}}` (will show as "Dirt Dudes Excavating")
4. **From Email**: `btslender@dirtdudesexcavating.com` (or your sending email)
5. **Reply To**: `{{from_email}}` (so replies go to your business email)
6. **Subject**: `Thank You for Contacting Dirt Dudes Excavating`

## Step 3: Copy the HTML Template

Replace the email body with this HTML (copy the entire block):

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            margin: 20px auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #FFC107 0%, #FFA000 100%);
            padding: 40px 30px;
            text-align: center;
        }
        .header img {
            max-width: 250px;
            height: auto;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #1a1a1a;
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #1a1a1a;
            margin-bottom: 20px;
            font-weight: 600;
        }
        .message {
            color: #333;
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 30px;
        }
        .highlight-box {
            background-color: #F4F1EA;
            border-left: 4px solid #FFC107;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .highlight-box p {
            margin: 0;
            color: #1a1a1a;
            font-size: 15px;
        }
        .contact-info {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: center;
        }
        .contact-info p {
            margin: 8px 0;
            color: #333;
            font-size: 14px;
        }
        .contact-info a {
            color: #FFC107;
            text-decoration: none;
            font-weight: 600;
        }
        .contact-info a:hover {
            text-decoration: underline;
        }
        .footer {
            background-color: #1a1a1a;
            color: #ffffff;
            padding: 30px;
            text-align: center;
        }
        .footer p {
            margin: 5px 0;
            font-size: 14px;
            color: #ffffff;
        }
        .footer .company-name {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .footer .tagline {
            color: #FFC107;
            font-size: 12px;
            font-style: italic;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header with Logo -->
        <div class="header">
            <img src="https://dirtdudesexcavating.com/images/DirtDudes_Usable_Logo.png" alt="Dirt Dudes Excavating Logo" />
            <h1>Thank You!</h1>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <div class="greeting">
                Hi {{customer_name}},
            </div>
            
            <div class="message">
                <p>Thank you for reaching out to <strong>Dirt Dudes Excavating</strong>! We've successfully received your inquiry and appreciate you taking the time to contact us.</p>
                
                <p>Our team is committed to providing exceptional service, and we'll review your project details carefully. You can expect to hear back from us within <strong>1-2 business days</strong>.</p>
            </div>
            
            <div class="highlight-box">
                <p><strong>📋 What happens next?</strong></p>
                <p style="margin-top: 10px;">We'll review your submission and get in touch to discuss your project needs, answer any questions, and provide you with a detailed quote.</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="contact-info">
                <p style="font-weight: bold; color: #1a1a1a; margin-bottom: 15px;">Need to reach us sooner?</p>
                <p><strong>Email:</strong> <a href="mailto:{{contact_email}}">{{contact_email}}</a></p>
                <p style="margin-top: 10px; font-size: 13px; color: #666;">Submitted on: {{submission_date}}</p>
            </div>
            
            <div class="message" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 14px; color: #666; margin: 0;">We look forward to working with you!</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="company-name">Dirt Dudes Excavating INC.</p>
            <p class="tagline">For Over 40 Years</p>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">Professional Excavation & Site Development Services</p>
            <p style="margin-top: 10px; font-size: 11px; color: #666;">This is an automated confirmation email. Please do not reply directly to this message.</p>
        </div>
    </div>
</body>
</html>
```

## Step 4: Update Logo URL (if needed)

If your logo is hosted at a different URL, update this line in the template:
```html
<img src="https://dirtdudesexcavating.com/images/DirtDudes_Usable_Logo.png" alt="Dirt Dudes Excavating Logo" />
```

Replace `https://dirtdudesexcavating.com/images/DirtDudes_Usable_Logo.png` with your actual logo URL.

## Step 5: Save Template and Get Template ID

1. Click **"Save"** in EmailJS
2. **Copy the Template ID** (it will look like `template_xxxxxxx`)
3. You'll need this for the next step

## Step 6: Update the Code

Open `js/form-handler.js` and find this line (around line 230):

```javascript
const CONFIRMATION_TEMPLATE_ID = 'YOUR_CONFIRMATION_TEMPLATE_ID';
```

Replace it with your actual confirmation template ID:

```javascript
const CONFIRMATION_TEMPLATE_ID = 'template_xxxxxxx'; // Your actual confirmation template ID
```

## Step 7: Optional - Add Your Phone Number

If you want to include your phone number in the confirmation email, find this line in `js/form-handler.js` (around line 280):

```javascript
contact_phone: '(Your phone number here)'
```

Replace it with your actual phone number:

```javascript
contact_phone: '(707) 123-4567' // Your actual phone number
```

Then in your EmailJS template, you can add a phone line in the contact-info section:

```html
<p><strong>Phone:</strong> {{contact_phone}}</p>
```

## Step 8: Test It!

1. Save `js/form-handler.js`
2. Hard refresh your website (`Ctrl + Shift + R`)
3. Fill out and submit the contact form
4. Check your email - you should receive:
   - The form submission email (to btslender@dirtdudesexcavating.com)
   - A confirmation email (to the email address you used in the form)

## Template Variables Reference

The confirmation email uses these variables (already set up in the code):

- `{{to_email}}` - User's email address
- `{{to_name}}` - User's full name
- `{{customer_name}}` - User's full name (for greeting)
- `{{submission_date}}` - Formatted date of submission
- `{{contact_email}}` - Your business email
- `{{contact_phone}}` - Your phone number (optional)

## Troubleshooting

**Confirmation email not sending:**
- Make sure you've updated `CONFIRMATION_TEMPLATE_ID` in `form-handler.js`
- Check that the template uses `{{to_email}}` in the "To Email" field
- Verify the template is saved and active in EmailJS

**Logo not showing:**
- Make sure the logo URL is publicly accessible
- Use HTTPS URL
- Check that the image path is correct

**Variables not showing:**
- Make sure variable names match exactly (case-sensitive)
- Variables must be wrapped in double curly braces: `{{variable_name}}`

## Customization Tips

**Change colors:**
- Header background: Change `#FFC107` and `#FFA000` to your brand colors
- Accent color: Change `#FFC107` throughout to match your brand

**Add more information:**
- Add your website URL
- Add social media links
- Add office hours
- Add service areas

**Change messaging:**
- Adjust the response time (currently "1-2 business days")
- Customize the "What happens next?" section
- Add more personalized content

That's it! Your confirmation emails should now be working. 🎉
