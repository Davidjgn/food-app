"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [error, setError] = useState(false);
    async function handleFormSubmit(e) {
        e.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if(!response.ok){
            setError(true);
        }else{
            setUserCreated(true);
        }
        setCreatingUser(false);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User Created.<br />
                    You can now <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has occurred.<br />
                    Please try again
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                    disabled={creatingUser}
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password}
                    disabled={creatingUser}
                    onChange={e => setPassword(e.target.value)} />
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button onClick={()=>signIn('google', {callbackUrl:'/'})} 
                        className="flex gap-4 justify-center border border-gray-300 ">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 pt-2 border-t">
                    Already have an account? <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    );
}