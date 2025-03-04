import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

const FrontEndUrl = process.env.FRONT_END_URL;
const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;


@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: `${email}`,
        pass: `${password}`,
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://${FrontEndUrl}/reset-password?token=${token}`;
    const mailOptions = {
      from: 'Auth-backend service',
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}