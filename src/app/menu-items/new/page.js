'use client';
import { useProfile } from "@/components/UseProfile";
import Left from "@/components/icons/left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewMenuItemPage(){

    const [redirectMenu, setRedirectMenu] = useState(false);
    const {loading, data} = useProfile();

    async function handleFormSubmit(e, data){
        e.preventDefault();
        const savingPromise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type':'application/json'},
            });
            if(response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving menu item',
            success: 'Menu item saved',
            error: 'Error',
        });

        setRedirectMenu(true);
    }

    if(redirectMenu){
        return redirect('/menu-items');
    }

    if(loading){
        return 'Loading...';
    }
    if(!data.admin){
        return 'Not an admin.';
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={data.admin} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items.</span>
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
        </section>
    );
}