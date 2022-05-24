import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a1b0d0261be2d6",
      pass: "f1a0f374fae4b4"
    }
  });

app.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type: type,
            comment: comment,
            screenshot: screenshot
        }
    })

    await transport.sendMail({
        from: 'Equipe FeedGet <oi@feedget.com>',
        to: 'William Lima <lima14.wl@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p> Tipo do feedback ${type}</p>`,
            `<p>Comentátio: ${comment} </p>`,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({data: feedback})
});

app.listen(3333, ()=>{
    console.log("HTTP server is running!");
})