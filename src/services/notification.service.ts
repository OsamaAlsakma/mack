import { JobApplication } from '@prisma/client';
import { sendEmail } from './email.service';
import { logger } from '../utils/logger';

export const sendApplicationNotification = async (application: JobApplication & { job?: any }) => {
  try {
    // Send confirmation to applicant
    await sendEmail({
      to: application.email,
      subject: 'Application Received',
      html: `
        <h1>Thank you for your application</h1>
        <p>We have received your application for the position of ${application.job?.titleEn}.</p>
        <p>We will review your application and get back to you soon.</p>
      `
    });

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@dragon.com',
      subject: 'New Job Application',
      html: `
        <h1>New Job Application Received</h1>
        <p>Position: ${application.job?.titleEn}</p>
        <p>Applicant: ${application.name}</p>
        <p>Email: ${application.email}</p>
        <p>Phone: ${application.phone}</p>
        <a href="${process.env.ADMIN_DASHBOARD_URL}/applications/${application.id}">View Application</a>
      `
    });

    logger.info(`Application notification sent for application: ${application.id}`);
  } catch (error) {
    logger.error('Error sending application notification:', error);
  }
};