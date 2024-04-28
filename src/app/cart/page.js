'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data:profileData} = useProfile();

    useEffect(()=>{
        if(typeof window !== 'undefined'){
            if(window.location.href.includes('canceled=1')){
                toast.error('Payment failed.')
            }
        }
    }, []);

    useEffect(()=>{
        if(profileData){
            const {phone, street, pCode, city, country} = profileData;
            setAddress({phone, street, pCode, city, country});
        }
    }, [profileData]);

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }
    function handleAddressChange(propName,value){
        setAddress(prevAddress=>{
            return {...prevAddress, [propName]:value};
        });
    }

    async function handleCheckout(e) {
        e.preventDefault();

        const promise = new Promise((resolve,reject)=>{
            fetch('/api/checkout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({address, cartProducts}),
            }).then(async (response) =>{
                if(response.ok){
                    resolve();
                    window.location = await response.json();
                }
                else{
                    reject();
                }                
            });
        })

        await toast.promise(promise, {
            loading: 'Preparing order',
            success: 'Redirecting to payment',
            error: 'Error',
        })
    }

    if(cartProducts?.length === 0){
        return(
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader={'Cart'} />
                <p className="mt-4">Your shopping cart is empty.</p>
            </section>
        );
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader={'Cart'} />
            </div>
            <div className="grid md:gap-8 md:grid-cols-2 mt-8">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>
                            No products in your shopping cart.
                        </div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct product={product} onRemove={removeCartProduct} index={index} key={index} />
                    ))}
                    <div className="py-2 pr-16 flex items-center justify-end">
                        <div className="text-gray-700">
                            Subtotal: <br/>
                            Delivery fee: <br/>
                            Total: 
                        </div>
                        <div className="font-semibold pl-2 text-right">
                            ${subtotal} <br/>
                            $5 <br/>
                            ${subtotal + 5}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={handleCheckout}>
                        <AddressInputs addressProps={address} setAddressProps={handleAddressChange}/>
                        <button type="submit">Pay ${subtotal + 5}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}