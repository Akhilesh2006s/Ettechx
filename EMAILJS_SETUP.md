# EmailJS Setup Guide

This application uses EmailJS to send automated emails to `amenityforge@gmail.com` when users:
- Subscribe to the newsletter
- Register for the event
- Submit an exhibitor application

## Setup Instructions

### 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)

### 2. Create an Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account (amenityforge@gmail.com)
5. Note down your **Service ID**

### 3. Create an Email Template
1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
{{subject}}
```

**Content:**
```
From: {{from_email}}
Reply-To: {{reply_to}}

{{message}}

---
This is an automated email from Et Tech X website.
```

4. Add these template variables in the template:
   - `{{to_email}}` - recipient email (will be set to amenityforge@gmail.com)
   - `{{from_email}}` - sender email
   - `{{subject}}` - email subject
   - `{{message}}` - formatted message with all form details
   - `{{reply_to}}` - reply-to email address

5. Note down your **Template ID**

### 4. Get Your Public Key
1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy it

### 5. Configure Environment Variables
Create a `.env` file in the root of your project with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual EmailJS credentials.

### 6. Restart Your Development Server
After adding the environment variables, restart your dev server:
```bash
npm run dev
```

## Email Format

The emails will be sent to `amenityforge@gmail.com` with all the form details formatted as:

### Newsletter Subscription:
- Email address
- Subscription date

### Event Registration:
- Full Name
- Email
- Phone
- Organization
- Designation
- Number of Attendees
- Event Interest
- Registration Date

### Exhibitor Application:
- Company Name
- Contact Person
- Email
- Phone
- Website
- Full Address (Street, City, State, Pincode)
- Preferred Booth Size
- Products/Services Description
- Previous Exhibitor Status
- Application Date

## Testing

After setup, test each form:
1. Subscribe to newsletter
2. Submit a registration
3. Submit an exhibitor application

Check your `amenityforge@gmail.com` inbox for the automated emails.

## Troubleshooting

- **Emails not sending**: Check browser console for errors
- **Invalid credentials**: Verify your environment variables are correct
- **Template errors**: Ensure all template variables are properly set in EmailJS dashboard
- **Rate limits**: Free tier has 200 emails/month limit

## Security Note

The EmailJS Public Key is safe to expose in frontend code. However, for production, consider:
- Using environment variables (already implemented)
- Setting up domain restrictions in EmailJS dashboard
- Monitoring email usage
