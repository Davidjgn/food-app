'use client'
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import { useEffect, useContext, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";
import { cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";

export default function OrdersPage() {
    const { clearCart } = useContext(CartContext);
    const { id } = useParams();
    const [order, setOrder] = useState();
    const { loading } = useProfile();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }
        if (id) {
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                });
            });
        }
    }, []);

    let subtotal = 0;

    if(order?.cartProducts){
        for(const product of order?.cartProducts){
            subtotal += cartProductPrice(product);
        }
    }
    
    if (loading) {
        return 'Loading...';
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader={'Your order'} />
                <div className="mt-4 mb-8">
                    <p>Thank you for ordering.</p>
                    <p>We will inform you when its on the way.</p>
                </div>
            </div>
            {order && (
                <div className="grid md:grid-cols-2 md:gap-16">
                    <div>
                        {order.cartProducts.map((product, index) => (
                            <CartProduct key={index} product={product} />
                        ))}
                        <div className="py-2 flex items-center justify-end">
                            <div className="text-gray-700">
                                Subtotal: <br />
                                Delivery fee: <br />
                                Total:
                            </div>
                            <div className="font-semibold pl-2 text-right">
                                ${subtotal} <br />
                                $5 <br />
                                ${subtotal + 5}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-200 p-4 rounded-lg">
                            <AddressInputs disabled={true} addressProps={ order } />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}