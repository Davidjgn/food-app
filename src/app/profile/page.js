'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";

export default function ProfilePage() {
    const session = useSession();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetch, setProfileFetch] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response =>{
                response.json().then(data =>{
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetch(true);
                });
            });
        }
    }, [session, status])

    async function handleNameUpdate(e, data) {
        e.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error while saving'
        });
    }


    if (status === 'loading' || !profileFetch) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={user} onSave={handleNameUpdate} />
                
            </div>
        </section>
    );
}