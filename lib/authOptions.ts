/* eslint-disable @typescript-eslint/ban-ts-comment */
import dbConnect from "@/database/connection";
import User, { Role } from "@/database/models/user.schema";
import  { AuthOptions, Session } from "next-auth";
import { } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

interface IToken{name : string,email:string,picture:string,sub:string,id:string,role:string}
export const authOptions:AuthOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }), 
    ], 
    secret : process.env.NEXTAUTH_SECRET,
    callbacks : {
        //@ts-ignore
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
        //@ts-ignore
      async jwt({token}:{token : IToken}){
        await dbConnect()
        const user = await User.findOne({
            email : token.email
        })
        console.log(user,"USER")
        if(user){
            token.id = user._id
            token.role = user.role
        }
        return token 
      },
      //@ts-ignore
       async session({session,token}:{session:Session,token:IToken}){
           if(token){
            session.user.id = token.id; 
            session.user.role = token.role as Role
           }
          
           return session;
        
        }
    }
}