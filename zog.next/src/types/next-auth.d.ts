import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      userRole?: string | null;
      utm_partner?: string | null;
      isPartner: boolean;
      partnerId?: string;
    } & DefaultSession["user"];
  }
  interface DefaultUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    userRole?: string;
    utm_partner?: string | null;
    isPartner: boolean;
    partnerId?: string;
  }
}
