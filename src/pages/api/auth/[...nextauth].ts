import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthErrorResponse, AuthSuccessResponse } from "~/types";

type AuthResponse = {
  data: {
    user_id: string;
    email: string;
    access_token: string;
  };
  success: boolean;
  message: string;
  status: string;
};

type ErrorResponse = AuthResponse & {
  error: string;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          },
        );

        const response = (await res.json()) as
          | AuthSuccessResponse
          | AuthErrorResponse;

        if (res.ok) {
          const success = response as AuthSuccessResponse;

          const user = {
            id: success.data.user_id,
            email: success.data.email,
            access_token: success.data.access_token,
          };

          return user;
        } else {
          const error = response as AuthErrorResponse;

          throw new Error(error?.message || "Authorization failed");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      session.user.access_token = token.access_token as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
});
