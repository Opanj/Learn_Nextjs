import { login, loginWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
        // fullname: {
        //   label: "Full name",
        //   type: "text",
        // },
        password: { label: "Password", type: "password" },
      },

      // authorize untuk menangkap semua credential yg diinput
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // register user
        // const user: any = {
        //   id: 1,
        //   email: email,
        //   password: password,
        //   fullname: fullname,
        // };
        // if (user) {
        //   // console.log(user);
        //   return user;
        // } else {
        //   return null;
        // }

        // login user
        const user: any = await login({ email });
        // melakukan pengecekan
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (!passwordConfirm) {
            return null;
          }
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
    // login dengan google
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        // login dengan google ada 3 yg akan ditangkap
        const data = {
          email: user?.email,
          fullname: user?.name,
          image: user?.image,
          type: "google",
        };
        // memanggil sevice login google
        await loginWithGoogle(
          data,
          (res: { status: boolean; message: string; data: any }) => {
            if (res.status) {
              token.email = res.data.email;
              token.fullname = res.data.fullname;
              token.image = res.data.image;
              token.type = res.data.type;
              token.role = res.data.role;
            }
          }
        );
        console.log(data);
        // token = data;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        // "email" in token
        session.user.email = token.email;
        session.user.fullname = token.fullname;
        session.user.role = token.role;
        session.user.image = token.image;
      }
      // console.log(session, token);
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
