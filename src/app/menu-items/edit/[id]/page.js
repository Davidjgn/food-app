'use client';
import { useProfile } from "@/components/UseProfile";
import Left from "@/components/icons/left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage(){

    const {id} = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectMenu, setRedirectMenu] = useState(false);
    const {loading, data} = useProfile();

    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(items=>{
                const item = items.find(i=> i._id === id);
                setMenuItem(item);
            });
        })
    }, []);

    async function handleFormSubmit(e, data){
        e.preventDefault();
        data = {...data, _id:id};
        const savingPromise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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
    
    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/menu-items?_id='+id, {
                method: 'DELETE',
            });
            if(response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(promise, {
            loading: 'Deleting menu item.',
            success: 'Menu item deleted.',
            error: 'Error',
        })
        
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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
            <div className="max-w-2xl mx-auto mt-4">
                <div className="grid items-start gap-4" style={{ gridTemplateColumns: '.3fr .7fr' }}>
                    <div></div>
                    <DeleteButton label="Delete this menu item." onDelete={handleDeleteClick} />
                </div>
            </div>
        </section>
    );
}