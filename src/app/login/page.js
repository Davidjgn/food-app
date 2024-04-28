"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";
import Right from "@/components/icons/right";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginProgress, setLoginProgress] = useState(false);

    async function handleFormSubmit(e){
        e.preventDefault();
        setLoginProgress(true);

        await signIn("credentials", {email, password, callbackUrl:"/"});
        
        setLoginProgress(false);
    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email}
                    disabled={loginProgress}
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="password" value={password}
                    disabled={loginProgress}
                    onChange={e => setPassword(e.target.value)} />
                <button type="submit" disabled={loginProgress}>Login</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" onClick={()=>signIn("google", {callbackUrl:"/"})} 
                        className="flex gap-4 justify-center border border-gray-300 ">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 pt-2 border-t">
                    Don't have an account? <Link className="underline" href={"/register"}>Register here </Link>
                </div>
            </form>
        </section>
    );
}