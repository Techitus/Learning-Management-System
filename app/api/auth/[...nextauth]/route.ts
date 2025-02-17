/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";
import NextAuth, {  Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt"; 
//@ts-ignore
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }: { user: { name: string; email: string; image: string } }): Promise<boolean> {
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

    async jwt({ token, user }: { token: JWT; user?: any }) {
      await dbConnect();
      if (user) {
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString(); 
          token.role = dbUser.role || "student";
        }
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: any }) {
      session.user.id = token.id; 
      session.user.role = token.role; 
      return session;
    },
  },
};

//@ts-ignore
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
