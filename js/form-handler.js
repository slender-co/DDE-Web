/**
 * Contact Form Handler
 * Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
});

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const formMessage = document.getElementById('form-message');
    
    // Validate form
    if (!validateForm(form)) {
        showMessage('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    
    // Prepare data
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        projectDetails: formData.get('projectDetails'),
        timestamp: new Date().toISOString()
    };
    
    try {
        // Send both emails: one to business, one confirmation to user
        const response = await submitForm(data);
        
        if (response.success) {
            // Send confirmation email to user
            try {
                await sendConfirmationEmail(data);
            } catch (confirmationError) {
                // Don't fail the whole submission if confirmation fails
                console.warn('Confirmation email failed:', confirmationError);
            }
            
            showMessage('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
            form.reset();
            
            console.log('Form submitted:', data);
        } else {
            throw new Error(response.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitText.textContent = 'Send Request';
    }
}

/**
 * Validate entire form
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate individual field
 */
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldContainer = field.closest('.space-y-2') || field.parentElement;
    
    // Remove existing error
    clearFieldError(e);
    
    // Check if required
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldContainer, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(fieldContainer, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
            showFieldError(fieldContainer, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

/**
 * Show field error
 */
function showFieldError(container, message) {
    // Remove existing error
    const existingError = container.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to input
    const input = container.querySelector('input, textarea');
    if (input) {
        input.classList.add('border-red-500', 'focus:ring-red-500');
    }
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-500 text-xs mt-1';
    errorDiv.textContent = message;
    container.appendChild(errorDiv);
}

/**
 * Clear field error
 */
function clearFieldError(e) {
    const field = e.target;
    const fieldContainer = field.closest('.space-y-2') || field.parentElement;
    
    // Remove error message
    const errorDiv = fieldContainer.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    // Remove error classes
    field.classList.remove('border-red-500', 'focus:ring-red-500');
}

/**
 * Show form message
 */
function showMessage(message, type = 'success') {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.classList.remove('hidden');
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

/**
 * Submit form data using EmailJS
 * Sends email to btslender@dirtdudesexcavating.com
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Create an Email Service (Gmail, Outlook, etc.) and connect your email
 * 3. Create an Email Template with these variables:
 *    - {{from_name}} - Sender's name
 *    - {{from_email}} - Sender's email
 *    - {{phone}} - Phone number
 *    - {{message}} - Project details
 *    - {{subject}} - Email subject
 * 4. Get your Service ID, Template ID, and Public Key from EmailJS dashboard
 * 5. Replace the placeholder values below with your actual IDs
 */
async function submitForm(data) {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded. Please include the EmailJS script.');
        throw new Error('Email service not configured');
    }
    
    // ============================================
    // EMAILJS CONFIGURATION - REPLACE THESE VALUES
    // ============================================
    const SERVICE_ID = 'service_w811qhj'; // Get from EmailJS Dashboard > Email Services
    const TEMPLATE_ID = 'template_ot4es8q'; // Get from EmailJS Dashboard > Email Templates
    const PUBLIC_KEY = 't7-DD82nS9IboYouv'; // Get from EmailJS Dashboard > Account > API Keys
    
    // Check if configuration is set
    if (SERVICE_ID === 'YOUR_SERVICE_ID' || TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.error('EmailJS not configured. Please set SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY in form-handler.js');
        // Fallback: show instructions to user
        throw new Error('Email service is being configured. Please contact us directly at btslender@dirtdudesexcavating.com');
    }
    
    // Initialize EmailJS with public key
    emailjs.init(PUBLIC_KEY);
    
    // Prepare email template parameters
    // These variable names must match your EmailJS template variables
    // For SMTP, make sure 'to_email' is set in your template OR passed here
    const templateParams = {
        to_email: 'btslender@dirtdudesexcavating.com', // Required for SMTP
        to_name: 'Dirt Dudes Excavating', // Optional recipient name
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        message: data.projectDetails,
        subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
        timestamp: new Date().toLocaleString(),
        reply_to: data.email // Allows you to reply directly to the sender
    };
    
    try {
        // Send email using EmailJS
        console.log('Sending email with params:', templateParams);
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
        
        console.log('EmailJS response:', response);
        
        if (response.status === 200 || response.text === 'OK') {
            return { success: true, message: 'Message sent successfully' };
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('EmailJS error details:', error);
        console.error('Error code:', error?.code);
        console.error('Error text:', error?.text);
        console.error('Error message:', error?.message);
        
        // More specific error message
        let errorMsg = 'Failed to send message. ';
        if (error?.text) {
            errorMsg += `Error: ${error.text}. `;
        }
        errorMsg += 'Please try again or contact us directly at btslender@dirtdudesexcavating.com';
        
        throw new Error(errorMsg);
    }
}

/**
 * Send confirmation email to the user who submitted the form
 * Uses a separate EmailJS template for the auto-reply
 */
async function sendConfirmationEmail(data) {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded.');
        return; // Don't throw error, just fail silently
    }
    
    // ============================================
    // CONFIRMATION EMAIL CONFIGURATION
    // ============================================
    const SERVICE_ID = 'service_w811qhj'; // Same service as main email
    const CONFIRMATION_TEMPLATE_ID = 'template_9czeyz4'; // NEW: Create this template in EmailJS
    const PUBLIC_KEY = 't7-DD82nS9IboYouv'; // Same public key
    
    // Check if confirmation template is configured
    if (CONFIRMATION_TEMPLATE_ID === 'YOUR_CONFIRMATION_TEMPLATE_ID') {
        console.warn('Confirmation email template not configured. Skipping confirmation email.');
        return; // Don't throw error, just skip
    }
    
    // Initialize EmailJS (if not already initialized)
    emailjs.init(PUBLIC_KEY);
    
    // Prepare confirmation email template parameters
    const confirmationParams = {
        to_email: data.email, // Send to the person who submitted the form
        to_name: `${data.firstName} ${data.lastName}`,
        from_name: 'Dirt Dudes Excavating',
        from_email: 'btslender@dirtdudesexcavating.com',
        customer_name: `${data.firstName} ${data.lastName}`,
        submission_date: new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        contact_email: 'btslender@dirtdudesexcavating.com',
        contact_phone: '(Your phone number here)' // Optional: Add your phone number
    };
    
    try {
        // Send confirmation email
        console.log('Sending confirmation email with params:', confirmationParams);
        const response = await emailjs.send(SERVICE_ID, CONFIRMATION_TEMPLATE_ID, confirmationParams);
        
        console.log('Confirmation email response:', response);
        
        if (response.status === 200 || response.text === 'OK') {
            console.log('Confirmation email sent successfully to:', data.email);
        } else {
            console.warn('Confirmation email may have failed. Response:', response);
        }
    } catch (error) {
        console.error('Confirmation email error details:', error);
        console.error('Error code:', error?.code);
        console.error('Error text:', error?.text);
        console.error('Error message:', error?.message);
        // Don't throw - we don't want confirmation failures to break the form
    }
}
