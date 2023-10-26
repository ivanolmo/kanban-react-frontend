import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

type User = {
  id: number;
  email: string;
  access_token: string;
};

type ErrorResponse = {
  message: string;
};

type JWT = {
  user: User;
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
        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (res.ok) {
          const user = (await res.json()) as User;
          console.log("success");
          console.log(user);
          return user;
        } else {
          console.log("failed");
          const error = (await res.json()) as ErrorResponse;
          throw new Error(error?.message || "Authorization failed");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // return { ...token, ...user };
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
});
