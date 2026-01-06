# EmailJS Template Customization Guide

## Issue 1: Form Data Not Showing

Your template needs to include the form variables to display the actual submission data.

## Step 1: Update Your Email Template Content

Go to EmailJS Dashboard → Email Templates → Edit your template (`template_ot4es8q`)

### Replace the email body with this:

**Subject Line:**
```
New Contact Form Submission: {{subject}}
```

**Email Body (HTML):**
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
            padding: 20px;
        }
        .header {
            background-color: #FFC107;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header img {
            max-width: 200px;
            height: auto;
        }
        .content {
            background-color: #ffffff;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
        }
        .info-box {
            background-color: #F4F1EA;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #FFC107;
        }
        .info-row {
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #1a1a1a;
            display: inline-block;
            width: 120px;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
        }
        .value {
            color: #333;
        }
        .message-box {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border: 1px solid #e0e0e0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://your-domain.com/images/DirtDudes_Usable_Logo.png" alt="Dirt Dudes Excavating Logo" />
        <h2 style="color: #1a1a1a; margin: 15px 0 0 0;">New Contact Form Submission</h2>
    </div>
    
    <div class="content">
        <p>You have received a new contact form submission from your website.</p>
        
        <div class="info-box">
            <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">{{from_name}}</span>
            </div>
            <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:{{from_email}}">{{from_email}}</a></span>
            </div>
            <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">{{phone}}</span>
            </div>
            <div class="info-row">
                <span class="label">Submitted:</span>
                <span class="value">{{timestamp}}</span>
            </div>
        </div>
        
        <div class="message-box">
            <strong style="display: block; margin-bottom: 10px; color: #1a1a1a;">Project Details:</strong>
            <p style="margin: 0; white-space: pre-wrap;">{{message}}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; font-size: 14px;">
                <strong>Reply to this email to respond directly to {{from_name}}</strong>
            </p>
        </div>
    </div>
    
    <div class="footer">
        <p>This email was sent from your website contact form.</p>
        <p style="margin: 5px 0;">Dirt Dudes Excavating INC.</p>
    </div>
</body>
</html>
```

## Step 2: Update Template Settings

In your EmailJS template settings:

1. **Content Type**: Select "HTML" (not plain text)
2. **To Email**: `btslender@dirtdudesexcavating.com` (hardcoded)
3. **From Name**: `{{from_name}}`
4. **Reply To**: `{{reply_to}}`
5. **Subject**: `New Contact Form Submission: {{subject}}`

## Step 3: Add Your Logo

You have two options:

### Option A: Host logo online (Recommended)
1. Upload your logo to your website (e.g., `images/DirtDudes_Usable_Logo.png`)
2. In the template HTML above, replace:
   ```html
   <img src="https://your-domain.com/images/DirtDudes_Usable_Logo.png" alt="Dirt Dudes Excavating Logo" />
   ```
   With your actual website URL:
   ```html
   <img src="https://dirtdudesexcavating.com/images/DirtDudes_Usable_Logo.png" alt="Dirt Dudes Excavating Logo" />
   ```

### Option B: Use EmailJS attachment (if supported)
- Some EmailJS plans allow uploading images directly

## Step 4: Test

1. Save your template in EmailJS
2. Go to your website
3. Submit the contact form
4. Check your email - you should now see:
   - Your logo
   - All form data (name, email, phone, message)
   - Professional formatting
   - Reply-to functionality

## Customization Options

### Change Colors
- Header background: `#FFC107` (yellow) - change to match your brand
- Border accent: `#FFC107` - change to match your brand
- Text colors: Adjust `#1a1a1a`, `#333`, `#666` as needed

### Add More Fields
If you add more form fields later, add them to:
1. `js/form-handler.js` - in the `templateParams` object
2. EmailJS template - add a new `{{variable_name}}` in the HTML

### Make it Mobile-Friendly
The template already includes responsive styling, but you can add more media queries if needed.

## Troubleshooting

**Logo not showing:**
- Make sure the image URL is publicly accessible
- Use HTTPS URL
- Check that the image path is correct

**Variables not showing:**
- Make sure variable names match exactly (case-sensitive)
- Variables must be wrapped in double curly braces: `{{variable_name}}`

**Email looks broken:**
- Make sure "Content Type" is set to "HTML" in template settings
- Check that all HTML tags are properly closed
