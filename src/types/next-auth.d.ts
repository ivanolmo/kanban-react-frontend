import type NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session extends NextAuth.Session {
    user: {
      id: string;
      email: string;
      access_token: string;
    };
  }
}
