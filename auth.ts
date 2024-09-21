import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import NextAuth, { type DefaultSession } from "next-auth"
import { getUserById } from "./data/user"
import authConfig from "./auth.config"
import { UserRole } from "@prisma/client"
import { getTwoFactorCofirmationByUserId } from "./data/two-factor-confirmation"

declare module "next-auth" {
    interface Session {
        user: {
            role: string}
            & DefaultSession["user"]
        }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
          async linkAccount({user}){
            await db.user.update({
                where: { id: user.id},
                data: { emailVerified: new Date()}
            })
          }
    },
    callbacks: {
        async signIn({user, account}) {
            if(account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);

            if(!existingUser?.emailVerified) return false;

            //TODO: 2FA CHECKS
            if(existingUser.isTwoFactorEnabled){
                const twoFactorConfirmation = await getTwoFactorCofirmationByUserId(existingUser.id)
                if(!twoFactorConfirmation) return false;

                await db.twoFactorConfirmation.delete({
                    where: {id: twoFactorConfirmation.id}
                })
            }
              return true;
        },
        async session({token, session}){
            
            console.log({sessionToken: token, })
            if(token.sub && session.user) {
                session.user.id = token.sub;
            } 


            if(token.role && session.user){
                session.user.role = token.role as UserRole //"ADMIN" | "USER"
            } 

            if(session.user){
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean; 
            } 
            return session;
        },
        async jwt({ token}) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if(!existingUser) return token;

            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            
            return token
        }
    } ,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig,
  

})