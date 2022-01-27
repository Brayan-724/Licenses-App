import NextAuth, { Account, Profile, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  useSecureCookies: process.env.NODE_ENV === "production",
  secret: process.env.NEXT_AUTH_SECRET,

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXT_AUTH_SECRET,
  },

  debug: process.env.NODE_ENV !== "production",
});
