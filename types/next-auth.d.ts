import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    subRole?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      subRole?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    subRole?: string;
    id?: string;
  }
}