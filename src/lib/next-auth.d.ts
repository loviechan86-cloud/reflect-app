import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: "STAFF" | "STUDENT";
  }

  interface Session {
    user: {
      id: string;
      role: "STAFF" | "STUDENT";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "STAFF" | "STUDENT";
  }
}
