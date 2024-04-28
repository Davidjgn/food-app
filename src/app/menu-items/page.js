'use client';
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "@/components/icons/right";
import Image from "next/image";

export default function MenuItemsPage(){

    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = useProfile();
    useEffect(()=>{
        fetch('/api/menu-items').then(res =>{
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        })
    }, []);

    if(loading){
        return 'Loading...';
    }
    if(!data.admin){
        return 'Not an admin.';
    }


    return(
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={data.admin} />
            <div className="mt-8">
                <Link className="button"
                href={'/menu-items/new'}>
                    Create new menu item
                    <Right/>
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item: </h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map((item, index) => (
                        <Link key={index} href={'/menu-items/edit/'+item._id} className="bg-gray-200 rounded-lg p-4">
                            <div className="relative">
                                <img src={item.image || 'pizza.png'} alt="pizza" className="max-h-64 block mx-auto" />
                            </div>
                            <div className="text-center">{item.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}