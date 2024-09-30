import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        name: { label: "Full Name", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // authorize untuk menangkap semua credential yg diinput
      async authorize(credentials) {
        const { email, name, password } = credentials as {
          email: string;
          name: string;
          password: string;
        };

        const user: any = {
          id: 1,
          email: email,
          password: password,
          name: name,
        };
        if (user) {
          // console.log(user);
          return user;
        } else {
          return null;
        }

        // Add logic here to look up the user from the credentials supplied
        // const res = await fetch("http://localhost:3000/api/hello", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "credentials") {
        token.email = user.email;
      }

      // console.log(token, user, account);
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        // "email" in token
        session.user.email = token.email;
      }

      // console.log(session, token);
      return session;
    },
  },
  // pages: {
  //   signIn: "/auth/login",
  // },
};

export default NextAuth(authOptions);
