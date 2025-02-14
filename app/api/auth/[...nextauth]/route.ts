/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";
import NextAuth, {  Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
//@ts-ignore
export const authOptions:AuthOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }), 
    ], 
    secret : process.env.NEXTAUTH_SECRET,
    callbacks : {
       async signIn({user}:{user : {name : string, email : string, image : string}}) : Promise<boolean>{
            try {
                await dbConnect()
               const existingUser = await User.findOne({email : user.email}) 
            
               if(!existingUser){
                await User.create({
                    username : user.name, 
                    email : user.email, 
                    profileImage : user.image,
                })
            }
            return true
            } catch (error) {
                console.log(error)
                return false
            }
        }, 
       async session({session,user}:{session:Session,user:any}){
           const data =  await User.findById(user.id)  
           session.user.role = data?.role || "student"
           return session
        
        }
    }
}
//@ts-ignore
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}