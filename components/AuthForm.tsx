"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'


const authFormSchema = (type : FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email : z.string().email(),
        password : z.string().min(6),
    })
}

const AuthForm = ({type} : {type : FormType}) => {
    // 1. Define your form.

    const formSchema = authFormSchema(type); 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email:"",
            password:"",
        },
    })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    try{
        if(type === 'sign-up'){
            console.log("Signed up");
            console.log(values);
        }
        else{
            console.log("Signed in");
            console.log(values);
        }

    }
    catch(error){
        console.log(error);
        toast.error("There was an error: "+`${error}`);
    }
  }


  const isSignin = (type == 'sign-in');
  const isSignup = (type == 'sign-up');
  return (
    <div className='card-border lg:min-w-[566px]'>  
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image 
                    src="/logo.svg" 
                    alt='logo' 
                    height={32} 
                    width={38}
                />
                <h2 className="text-primary-100">Interviewly</h2>
            </div>
            <h3>Practice Job Interview with AI</h3>
            <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6 mt-4 w-full form">
                {isSignup && <p>Name</p>}
                <p>Email</p>
                <p>Password</p>
                <Button type="submit" className='btn'>{isSignup ? "Create an Account" : "Sign In"}</Button>

                <p className='text-center'>
                    {isSignup ? "Already have an account?" : "No account yet?" }
                    <Link href={isSignup ? "/sign-in" : "/sign-up"}>{isSignup ? "Sign in" : "Sign up"}</Link>    
                </p>
            </form>
            </Form>
        </div>
    </div>
  )
}
export default AuthForm;