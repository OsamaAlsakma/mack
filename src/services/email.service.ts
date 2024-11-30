import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: true,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    await transporter.sendMail({
      from: `"DRAGON Software" <${config.smtp.user}>`,
      to: email,
      subject: 'Welcome to DRAGON Software',
      html: `
        <h1>Welcome to DRAGON Software, ${name}!</h1>
        <p>We're excited to have you on board.</p>
        <p>Start exploring our services and let us help you bring your ideas to life.</p>
      `,
    });
  } catch (error) {
    logger.error('Error sending welcome email:', error);
  }
};

export const sendProjectConfirmation = async (
  email: string,
  projectTitle: string
) => {
  try {
    await transporter.sendMail({
      from: `"DRAGON Software" <${config.smtp.user}>`,
      to: email,
      subject: 'Project Submission Confirmation',
      html: `
        <h1>Project Submission Confirmed</h1>
        <p>Your project "${projectTitle}" has been successfully submitted.</p>
        <p>Our team will review your project details and contact you soon.</p>
      `,
    });
  } catch (error) {
    logger.error('Error sending project confirmation email:', error);
  }
};