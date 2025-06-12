'use server'

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params : SignUpParams){
    const { uid,email, password, name } = params;
    try{
        const user = await db.collection('users').doc(uid).get();
        if(user.exists){
            return {
                success : false,
                error: 'User already exists, Please sign-in instead'
            }
        }
        const userCredential = await db.collection('users').doc(uid).set({
            email,
            name
        })
        return {
            success : true,
            message : "Account created successfully, Please Sign-in"
        }
    }
    catch(error : any){
        if(error.code === 'auth/email-already-in-use'){
            return { 
                success : false,
                message: 'Email already in use' 
            };
        }
        console.log(error);
        return {
            success : false,
            message: 'Error creating user'
        }
    }
}

export async function setSessionCookie(idToken : string){
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn : 60*60*24*7*1000
    })
    
    cookieStore.set('session',sessionCookie,{
        httpOnly : true,
        maxAge : 60*60*24*7*1000,
        secure : process.env.NODE_ENV === 'production',
        path : '/',
        sameSite : 'lax'
    });
}

export async function signIn(params : SignInParams){
    const { email, idToken } = params;
    try{
        const user = await auth.getUserByEmail(email);
        if(!user){
            return {
                success : false,
                error: 'User not exists, Please create account instead'
            }
        }
        await setSessionCookie(idToken);
        return {
            success : true,
            message : 'Signed in successfully'
        }
    }
    catch(error : any){
        console.log(error);
        return {
            success : false,
            message: 'Error while logging in user'
        }
    }
}

export async function getCurrentUser() : Promise<User|null>{
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if(!sessionCookie){
        return null;
    }
    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie,true);
        const user = await db.collection('users').doc(decodedClaims.uid).get();
        if(!user){
            return null;
        }
        return {
            ...user.data(),
            id : user.id,
        } as User;
    }
    catch(error){
        console.log(error);
        return null;
    }
}


export async function isAuthenticated(){
    const user = await getCurrentUser();
    return !!user;
}