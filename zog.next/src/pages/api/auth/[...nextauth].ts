import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { NextApiRequest, NextApiResponse } from "next";
import { partnerLinkInviteController } from "../../../backend/controllers/partnerLinkInviteController";
import { AuthQueryParam, getAuthParams } from "../../../backend/utils/getAuthQuery";
import { EmailController } from "../../../backend/controllers/emailController";
import { AuthHtml, orderSuccessHtml } from "../../../backend/utils/htmlEmail";
import { autoLoginLinkController } from "../../../backend/controllers/autoLoginLinkController";

export const authOptions: NextAuthOptions = {
  events: {
    async createUser({ user }) {
      await partnerLinkInviteController.checkEmail(user.email || "");
    },
    async signIn({ user }) {
      await autoLoginLinkController.check(user?.email || "");
    },
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user = user;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes("lk/profile")) return `${baseUrl}/lk/profile`;
      // После авторизации перенаправляет в ЛК
      return `${baseUrl}/lk`;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  providers: [],
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    // Configure one or more authentication providers
    ...authOptions,
    providers: [
      EmailProvider({
        sendVerificationRequest,
        from: process.env.EMAIL_FROM,
        server: {
          customAuth: {
            details: () => getAuthParams(req.query as AuthQueryParam),
          },
        },
      }),
    ],
  });
}

async function sendVerificationRequest(params: any) {
  const {
    identifier,
    url,
    provider: {
      server: { customAuth },
    },
  } = params;
  const { host } = new URL(url);

  const details: AuthQueryParam = customAuth.details();

  //auto login
  if (details?.auto_login) {
    await autoLoginLinkController.create(identifier, url);
    return;
  }

  try {
    if (details?.orderName) {
      await new EmailController().sendEmail({
        to: identifier,
        subject: "Ваша диагностика готова",
        html: orderSuccessHtml(url, details?.orderName || ""),
      });
    } else {
      await partnerLinkInviteController.create(details?.partner || "", identifier);
      await new EmailController().sendEmail({
        to: identifier,
        subject: `Вход в ${host}`,
        html: AuthHtml({ url, host }),
      });
    }
  } catch (e: any) {
    throw new Error(e);
  }
}
