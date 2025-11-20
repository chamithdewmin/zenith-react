/**
 * Contact Form API Service
 * Handles submission of contact form data to Hostinger database
 */

const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Submit contact form data to the backend API
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} formData.phone - User's phone number (optional)
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} API response
 */
export const submitContactForm = async (formData) => {
  // Check if API URL is configured
  if (!API_URL || API_URL.includes('yourdomain.com')) {
    console.error('❌ API URL not configured!');
    console.log('📝 Please update your .env file with your Hostinger API URL');
    console.log('Example: VITE_API_URL=https://yoursite.com/api/contact.php');
    
    return {
      success: false,
      message: '⚠️ API not configured. Please update .env file with your Hostinger domain and restart the server.',
      error: 'API_URL_NOT_CONFIGURED'
    };
  }

  try {
    console.log('🚀 Sending form to:', API_URL);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log('✅ Response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit form');
    }

    return {
      success: true,
      message: data.message || 'Message sent successfully!',
      data: data
    };

  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    
    // Provide helpful error messages based on error type
    let errorMessage = 'Failed to send message. ';
    
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      errorMessage += 'Cannot connect to server. Please check:\n' +
                     '1. Is your .env file configured with the correct API URL?\n' +
                     '2. Have you uploaded contact.php to Hostinger?\n' +
                     '3. Is your Hostinger domain accessible?';
      console.log('💡 Tip: Check your .env file and make sure VITE_API_URL points to your Hostinger domain');
    } else {
      errorMessage += error.message || 'Please try again later.';
    }
    
    return {
      success: false,
      message: errorMessage,
      error: error
    };
  }
};

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic validation)
 * @param {string} phone 
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate entire form
 * @param {Object} formData 
 * @returns {Object} Validation result
 */
export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
