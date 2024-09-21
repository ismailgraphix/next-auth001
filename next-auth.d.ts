import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"


export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole //"ADMIN" | "USER"
    isTwoFactorEnabled: boolean
}
declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}


