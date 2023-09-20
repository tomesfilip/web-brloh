import bcrypt from 'bcrypt';
import { db } from '../configs/db.config';
import { transporter } from '../configs/nodemailer.config';

type Props = {
  email: string;
  emailType: 'VERIFY' | 'FORGOT';
  userId: string;
};

export const sendEmail = async ({ email, emailType, userId }: Props) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedToken = await bcrypt.hash(userId.toString(), salt);

    if (emailType === 'VERIFY') {
      await db.user.update({
        where: {
          email: email,
        },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === 'FORGOT') {
      await db.user.update({
        where: {
          email: email,
        },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const mailRes = await transporter.sendMail({
      from: 'info@brloh.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to
        ${
          emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
        } or copy and paste the link below in your browser. <br/> ${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}`,
    });

    return mailRes;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
