import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {

  const {message} = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });


  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_FROM,
    to: process.env.NEXT_PUBLIC_EMAIL_TO,
    subject: "GPC Consultation request",
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({message: "Email was sent"});
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.error();
  }
}
