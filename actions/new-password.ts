"use server";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async(
     values: z.infer<typeof NewPasswordSchema>,
     token?: string | null,
) => {
   
    if(!token){
        return { error: "Missing Token!"}
    }

    const validatedFields = NewPasswordSchema.safeParse(values);


    if(!validatedFields.success){
        return { error: "Invalid Fields!"}
    }

    const {password} = validatedFields.data;


    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return {error: "Invalid Token!"}
    }

    const hasExipired = new Date(existingToken.expires) < new Date();

    if(hasExipired){
        return {error: "Token has Expired!"}
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return { error: "Email does not exist!"}
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: { password: hashedPassword}
    });

    await db.passwordResetToken.delete({
        where: {id: existingUser.id}
    })


    return { success: "password Updated!"}
};
