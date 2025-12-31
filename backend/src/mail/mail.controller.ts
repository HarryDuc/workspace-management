import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Public()
  @Get('send-email-test')
  async sendTestEmail() {
    return this.mailService.sendEmail("vuminhduc.contact@gmail.com", 'Harry Duc', 'cf1f4d5a-1d5f-4f3f-8c3d-2e5e5f5e5f5e');
  }

}
