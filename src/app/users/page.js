'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
    const {loading, data} = useProfile();
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            });
        });
    }, []);

    if(loading){
        return 'Loading...';
    }
    if(!data.admin){
        return 'Not an admin.';
    }
    return(
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={data.admin} />
            <div className="mt-8">
                {users.length > 0 && users.map((user, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex gap-4 items-center">
                        <div className="grow grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">{'No name'}</span>)}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        <div>
                            <Link href={'/users/'+user._id} className="button border">Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}