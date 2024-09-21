"use client";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { BeatLoader} from "react-spinners"
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verication";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if(success || error) return;
        if (!token){
            setError("Missing Token!");
            return;
        } 
        newVerification(token)
        .then((data) => {
            setSuccess(data.success),
            setError(data.error)
        })
        .catch(()=>{
            setError("Something went wrong!")
        })
    },[token, success, error]);

    useEffect(()=>{
        onSubmit()
    },[onSubmit])
    return (
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonHref="/auth/login"
        backButtonLabel="back to login"
        >
           <div className="flex items-center w-full justify-center">
            {!success && !error && (
                    <BeatLoader/>
            )}
           
            <FormSuccess message={error} />
            <FormError message={error} />
           </div>
        </CardWrapper>
    )
}