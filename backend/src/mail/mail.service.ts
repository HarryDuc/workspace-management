import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) { }

  async sendEmail(email: string, name: string, code: string, linkToken?: string): Promise<string> {
    this.mailerService
      .sendMail({
        to: email,
        subject: 'Activate your account',
        template: 'register',
        context: {
          name: name,
          activationCode: code,
          linkToken: linkToken,
        },
      })
      .then(() => {
        console.log('Email sent successfully');
      })
      .catch((err) => {
        throw new UnauthorizedException('Failed to send email: ' + err.message);
      });
    return "Sent email successfully";
  }
}
