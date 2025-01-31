import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: any;
      name?: any;
      firstname?: any;
      lastname?: any;
      email?: any;
      image?: any;
    } & DefaultSession["user"];
  }
}
