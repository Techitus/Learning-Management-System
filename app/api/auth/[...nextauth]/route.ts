/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/database/connection";
import User, { Role } from "@/database/models/user.schema";
import NextAuth, { Session, AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

// We'll extend the standard JWT type instead of creating a separate interface
// This allows for better type compatibility with NextAuth's expectations
export interface CustomToken extends JWT {
  id?: string;
  role?: Role;
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            username: user.name,
            email: user.email,
            profileImage: user.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token }) {
      await dbConnect();
      const user = await User.findOne({
        email: token.email,
      });
      console.log(user, "USER");
      if (user) {
        token.id = user._id.toString();
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      
      if (token && typeof token === 'object') {
        if (token.id) {
          session.user.id = token.id;
        }
        if (token.role) {
          session.user.role = token.role as Role;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };