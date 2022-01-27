import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

console.log(NextAuth, GitHubProvider, process.env);


export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
