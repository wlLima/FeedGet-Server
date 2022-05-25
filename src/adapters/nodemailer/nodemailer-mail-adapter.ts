import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a1b0d0261be2d6",
      pass: "f1a0f374fae4b4"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: 'Equipe FeedGet <oi@feedget.com>',
            to: 'William Lima <lima14.wl@gmail.com>',
            subject,
            html: body,
        })
    }
}