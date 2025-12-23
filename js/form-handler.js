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
        // In a real application, you would send this to your backend
        // For now, we'll simulate an API call
        const response = await submitForm(data);
        
        if (response.success) {
            showMessage('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
            form.reset();
            
            // Log to console (in production, this would go to your backend)
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
 * Submit form data
 * In production, replace this with actual API call
 */
async function submitForm(data) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // In production, you would do:
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            // return await response.json();
            
            // For demo purposes, always succeed
            resolve({ success: true, message: 'Message sent successfully' });
        }, 1000);
    });
}

