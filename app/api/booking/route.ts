import { NextResponse } from 'next/server';
import { translations } from '@/translations/common';
import type { Translations } from '@/translations/types';
import Mailjet from 'node-mailjet';

export async function POST(request: Request) {
  try {
    // Lấy dữ liệu từ request
    const formData = await request.json();
    const currentYear = new Date().getFullYear();

    // Lấy locale từ formData.locale
    const locale = typeof formData.locale === "string" && formData.locale in translations
      ? formData.locale
      : 'en';
    const t = translations[locale as keyof typeof translations] || translations['en']; 

    // Khởi tạo Mailjet client
    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY || '',
      process.env.MAILJET_SECRET_KEY || ''
    );

    const recipientEmails = {
      secretimmo: process.env.SECRETIMMO_EMAIL,
      nextimmo: process.env.NEXTIMMO_EMAIL
    };

    // HTML cho email người dùng
    const userEmailHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border-radius: 8px;">
      <div style="display: inline-block;">
        <img src="${process.env.WEBSITE_URL}/email-logo.png" alt="Logo" style="width: 220px;" />
      </div>
      <h2 style="color: #B38E41;">${t.email_subject_user || "Reservation request"}</h2>
      <p>${t.email_greeting_user?.replace('{name}', formData.name) || `Bonjour ${formData.name},`}</p>
      <p>${t.email_body_user || 'We have received your service reservation request and thank you for your message. <br>A member of our team will contact you shortly to confirm your request or propose an available time slot.'}</p>
      
      <h3>${t.personal_information || 'Informations personnelles'}: </h3>
      <ul>
        <li><strong>${t.name || 'Nom'}:</strong> ${formData.name}</li>
        <li><strong>${t.email || 'Email'}:</strong> ${formData.email}</li>
        <li><strong>${t.phone || 'Téléphone'}:</strong> ${formData.phone}</li>
        <li><strong>${t.service || 'Service'}:</strong> ${formData.service}</li>
        <li><strong>${t.message || 'Message'}:</strong> ${formData.message}</li>
      </ul>

      <p>${t.contact_soon || 'Nous vous contacterons très prochainement.'}</p>
      
      <hr style="border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="color: #999;">© ${currentYear} ${t.copyright}</p>
    </div>
    `;

    // HTML cho email quản trị viên
    const adminEmailHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border-radius: 8px;">
      <div style="display: inline-block;">
        <img src="${process.env.WEBSITE_URL}/email-logo.png" alt="Logo" style="width: 220px;" />
      </div>
      <h2 style="color: #B38E41;">${t.new_reservation_request}</h2>
      
      <h3>${t.personal_information || 'Informations personnelles'}: </h3>
      <ul>
        <li><strong>${t.name || 'Nom'}:</strong> ${formData.name}</li>
        <li><strong>${t.email || 'Email'}:</strong> ${formData.email}</li>
        <li><strong>${t.phone || 'Téléphone'}:</strong> ${formData.phone}</li>
        <li><strong>${t.service || 'Service'}:</strong> ${formData.service}</li>
        <li><strong>${t.message || 'Message'}:</strong> ${formData.message}</li>
      </ul>

      <hr style="border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="color: #999;">© ${currentYear} ${t.copyright}</p>
    </div>
    `;

    // Gửi email cho người dùng
    await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.EMAIL_USER || 'noreply@mc-production.lu',
              Name: 'Marc Careri'
            },
            To: [
              {
                Email: formData.email,
                Name: formData.name
              }
            ],
            Subject: t.email_subject_user || 'Votre demande de réservation a été reçue',
            HTMLPart: userEmailHtml
          }
        ]
      });

    // Gửi email cho quản trị viên
    await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.EMAIL_USER || 'noreply@mc-production.lu',
              Name: 'Marc Careri'
            },
            To: [
              {
                Email: (recipientEmails as any)[formData.emailType] || process.env.ADMIN_EMAIL || 'marc.careri@gmail.com',
                Name: 'Admin'
              }
            ],
            Subject: t.new_reservation_request || 'Nouvelle demande de réservation',
            HTMLPart: adminEmailHtml
          }
        ]
      });

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      message: 'Error sending emails',
      error: error?.message || error
    }, { status: 500 });
  }
}
