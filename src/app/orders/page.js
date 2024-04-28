'use client';
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
            })
        })
    }, []);

    if (loading) {
        return 'Loading...';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={data.admin} />
            <div className="mt-8">
                {orders?.length > 0 && orders.map((order, index) => (
                    <div key={index} className="bg-gray-100 mb-2 p-4 rounded-lg md:grid grid-cols-5 items-center">
                        <div className="text-center">
                            <div className={(order.paid ? 'bg-green-500' : 'bg-red-400') + ' p-2 rounded-md text-white w-20'}>
                                {order.paid ? 'Paid' : 'Not paid'}
                            </div>
                        </div>
                        <div className="col-span-2">
                            {order.email}
                            <div className="text-gray-500 text-sm">
                                {order.cartProducts.map(p => p.name).join(', ')}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 items-center whitespace-nowrap col-span-2">
                            {dbTimeForHuman(order.createdAt)}
                            <Link href={'/orders/' + order._id} className="button border">
                                Show order
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}