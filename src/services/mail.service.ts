import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MailService {
  private frontEndUrl: string;
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.frontEndUrl = this.configService.get<string>('FRONT_END_URL') || 'localhost:3000';

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('EMAIL'),
        clientId: this.configService.get<string>('CLIENT_ID'),
        clientSecret: this.configService.get<string>('CLIENT_SECRET'),
        refreshToken: this.configService.get<string>('REFRESH_TOKEN'),
      },
    });
     
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://${this.frontEndUrl}/change-password?token=${token}`;
    const mailOptions = {
      from: 'Auth-backend service',
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}