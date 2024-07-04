import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      tokens: {
        access_token: string;
        refresh: string;
      };
      user: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        is_active: boolean;
      };
      iat: number;
      exp: number;
      jti: string;
    };
  }
}
