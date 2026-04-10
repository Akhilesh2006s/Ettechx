import emailjs from '@emailjs/browser';

// EmailJS configuration
// These should be set in your .env file
const env: Record<string, string | undefined> =
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ?? {};
const EMAILJS_SERVICE_ID = env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = env.VITE_EMAILJS_PUBLIC_KEY || '';
const RECIPIENT_EMAIL = 'info@ettechx.com';

// Initialize EmailJS
// Guard against server-side execution during Next.js build/SSR.
if (typeof window !== "undefined" && EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export interface NewsletterSubscriptionData {
  email: string;
}

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  eventInterest: string;
}

export interface ExhibitorData {
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

type EmailType = "newsletter" | "registration" | "exhibitor";

// Overloads keep type-safety without using `any` (important for production reliability).
function formatEmailMessage(type: "newsletter", data: NewsletterSubscriptionData): string;
function formatEmailMessage(type: "registration", data: RegistrationData): string;
function formatEmailMessage(type: "exhibitor", data: ExhibitorData): string;
function formatEmailMessage(
  type: EmailType,
  data: NewsletterSubscriptionData | RegistrationData | ExhibitorData,
): string {
  switch (type) {
    case 'newsletter':
      return `
New Newsletter Subscription

Email: ${(data as NewsletterSubscriptionData).email}
Subscription Date: ${new Date().toLocaleString()}
      `.trim();

    case 'registration':
      return `
New Event Registration

Personal Information:
- Full Name: ${(data as RegistrationData).fullName}
- Email: ${(data as RegistrationData).email}
- Phone: ${(data as RegistrationData).phone}

Organization Details:
- Organization: ${(data as RegistrationData).organization}
- Designation: ${(data as RegistrationData).designation}

Event Details:
- Registration Type: ${(data as RegistrationData).eventInterest}

Registration Date: ${new Date().toLocaleString()}
      `.trim();

    case 'exhibitor':
      return `
New Exhibitor Application

Company Information:
- Company Name: ${(data as ExhibitorData).companyName}
- Contact Person: ${(data as ExhibitorData).contactPerson}
- Email: ${(data as ExhibitorData).email}
- Phone: ${(data as ExhibitorData).phone}
- Website: ${(data as ExhibitorData).website || 'Not provided'}

Address:
- Street: ${(data as ExhibitorData).address}
- City: ${(data as ExhibitorData).city}
- State: ${(data as ExhibitorData).state}
- Pincode: ${(data as ExhibitorData).pincode}

Exhibition Details:
- Preferred Booth Size: ${(data as ExhibitorData).boothSize}
- Previous Exhibitor: ${(data as ExhibitorData).previousExhibitor}

Products/Services:
${(data as ExhibitorData).products}

Application Date: ${new Date().toLocaleString()}
      `.trim();

    default:
      return '';
  }
}

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
