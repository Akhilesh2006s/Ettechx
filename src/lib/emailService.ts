import emailjs from '@emailjs/browser';

// EmailJS configuration
// These should be set in your .env file
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const RECIPIENT_EMAIL = 'amenityforge@gmail.com';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

interface NewsletterSubscriptionData {
  email: string;
}

interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  attendees: string;
  eventInterest: string;
}

interface ExhibitorData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  boothSize: string;
  products: string;
  previousExhibitor: string;
}

const formatEmailMessage = (type: 'newsletter' | 'registration' | 'exhibitor', data: any): string => {
  switch (type) {
    case 'newsletter':
      return `
New Newsletter Subscription

Email: ${data.email}
Subscription Date: ${new Date().toLocaleString()}
      `.trim();

    case 'registration':
      return `
New Event Registration

Personal Information:
- Full Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}

Organization Details:
- Organization: ${data.organization}
- Designation: ${data.designation}

Event Details:
- Number of Attendees: ${data.attendees}
- Event Interest: ${data.eventInterest}

Registration Date: ${new Date().toLocaleString()}
      `.trim();

    case 'exhibitor':
      return `
New Exhibitor Application

Company Information:
- Company Name: ${data.companyName}
- Contact Person: ${data.contactPerson}
- Email: ${data.email}
- Phone: ${data.phone}
- Website: ${data.website || 'Not provided'}

Address:
- Street: ${data.address}
- City: ${data.city}
- State: ${data.state}
- Pincode: ${data.pincode}

Exhibition Details:
- Preferred Booth Size: ${data.boothSize}
- Previous Exhibitor: ${data.previousExhibitor}

Products/Services:
${data.products}

Application Date: ${new Date().toLocaleString()}
      `.trim();

    default:
      return '';
  }
};

export const sendNewsletterEmail = async (data: NewsletterSubscriptionData): Promise<boolean> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS is not configured. Please set up environment variables.');
      // Return true to allow form submission even if email fails
      return true;
    }

    const message = formatEmailMessage('newsletter', data);
    
    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      from_email: data.email,
      subject: 'New Newsletter Subscription - Et Tech X',
      message: message,
      reply_to: data.email,
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Failed to send newsletter email:', error);
    // Return true to not block form submission if email fails
    return true;
  }
};

export const sendRegistrationEmail = async (data: RegistrationData): Promise<boolean> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS is not configured. Please set up environment variables.');
      return true;
    }

    const message = formatEmailMessage('registration', data);
    
    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      from_email: data.email,
      subject: `New Event Registration - ${data.fullName}`,
      message: message,
      reply_to: data.email,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Failed to send registration email:', error);
    return true;
  }
};

export const sendExhibitorEmail = async (data: ExhibitorData): Promise<boolean> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS is not configured. Please set up environment variables.');
      return true;
    }

    const message = formatEmailMessage('exhibitor', data);
    
    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      from_email: data.email,
      subject: `New Exhibitor Application - ${data.companyName}`,
      message: message,
      reply_to: data.email,
      company_name: data.companyName,
      contact_person: data.contactPerson,
      email: data.email,
      phone: data.phone,
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Failed to send exhibitor email:', error);
    return true;
  }
};
