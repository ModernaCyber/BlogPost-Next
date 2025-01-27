import { BASE_URL } from "@/lib/constants";
import NextAuth, { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // console.log(
        //   // "-----------------------------------authorize--------------------------------------" +
        //     JSON.stringify({
        //       username: credentials?.username,
        //       password: credentials?.password,
        //     })
        // );

        const res = await fetch(`${BASE_URL}/api/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        // console.log(
        //   JSON.stringify(res) +
        //     "-----------------------------------res--------------------------------------"
        // );
        const user = await res.json();
        // console.log(
        //   JSON.stringify(user) +
        //     "-----------------------------------user--------------------------------------"
        // );
        if (Array.isArray(user?.username)) {
          return null;
        }
        user.password = credentials?.password
        
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log({ token, user, account });

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      // console.log("-----------++++++++-------------")
      // console.log({ token, user, session });
      return session;
    },
  },
};
export default NextAuth(authOptions);
