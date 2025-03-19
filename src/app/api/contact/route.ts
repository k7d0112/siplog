import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';


const prisma = new PrismaClient();

type CreateContactRequestBody = {
  userName: string,
  email: string,
  content: string,
}

// export const POST = async (
//   request: NextRequest
// ) => {
//   try {
//     const body = await request.json();
//     const { userName, email, content }: CreateContactRequestBody = body;
//     const createContact = await prisma.contact.create({
//       data: {
//         userName,
//         email,
//         content,
//       },
//     });
//     return NextResponse.json({ status: 'OK', message: '問い合わせを受け付けました' }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ message: error.message }, { status: 400 });
//     }
//   }
// }


// nodemailerでメールを送信
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userName, email, content }: CreateContactRequestBody = body;

    await prisma.contact.create({
      data: {
        userName,
        email,
        content,
      },
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASSWORD,
      },
    });

    // 管理人が受け取るメール
    const toHostMailData = {
      from: email,
      to: "k7dworks@gmail.com",
      subject: `[新規お問い合わせ] ${userName}様より`,
      text: `${content} Send from ${email}`,
      html: `
      <p>【名前】</p>
      <p>${userName}</p>
      <p>【問い合わせ内容】</p>
      <p>${content}</p>
      <p>【メールアドレス】</p>
      <p>${email}</p>
      `
    };

    await transporter.sendMail(toHostMailData);
    return NextResponse.json({ status: 'ok', message: 'メール送信完了' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}