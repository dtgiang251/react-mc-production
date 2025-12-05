import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { translations } from '@/translations/common';
import type { Translations } from '@/translations/types';

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

    // Log để kiểm tra biến môi trường
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // true nếu là 465, false nếu là 587/25
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

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

    // Tùy chọn gửi email cho người dùng
    const userMailOptions = {
      from: '"Marc Careri" <marc.careri@gmail.com>',
      to: formData.email,
      subject: t.email_subject_user || 'Votre demande de réservation a été reçue',
      html: userEmailHtml,
    };

    // Tùy chọn gửi email cho quản trị viên
    const adminMailOptions = {
      from: '"Marc Careri" <marc.careri@gmail.com>',
      to: (recipientEmails as any)[formData.emailType] || process.env.ADMIN_EMAIL,
      subject: t.new_reservation_request || 'Nouvelle demande de réservation',
      html: adminEmailHtml,
    };

    // Gửi email
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      message: 'Error sending emails',
      error: error?.message || error
    }, { status: 500 });
  }
}
