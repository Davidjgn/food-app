import mongoose from "mongoose";
import {authOptions} from "@/app/api/authOptions/route";
import { getServerSession } from "next-auth";
import { Order } from "@/models/Order";
import { MenuItem } from "@/models/MenuItem";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    const {address,cartProducts} = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const orderDoc = await Order.create({
        email,
        ...address,
        cartProducts,
        paid: false,
    })

    const stripeLineItems = []
    for(const cartProduct of cartProducts){
        const productInfo = await MenuItem.findById(cartProduct._id);
        let productPrice = cartProduct.basePrice;
        if(cartProduct.size){
            const size = productInfo.sizes.find(size=>size._id.toString() === cartProduct.size._id.toString());
            productPrice += size.price;
        }
        if(cartProduct.extras?.length > 0){
            for(const cartExtra of cartProduct.extras){
                const extraInfo = productInfo.extraIng.find(extra=> extra._id.toString() === cartExtra._id.toString())
                productPrice += extraInfo.price;
            }
        }

        const productName = cartProduct.name;

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: productName,
                },
                unit_amount: productPrice * 100,
            },
        });
    }
    
    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.NEXTAUTH_URL + 'orders/'+ orderDoc._id.toString() + '?clear-cart=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: {orderId:orderDoc._id.toString()},
        payment_intent_data: {
            metadata: {orderId:orderDoc._id.toString()},
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: {amount: 500, currency: 'USD'},
                },
            }
        ],
    })

    return Response.json(stripeSession.url);
}