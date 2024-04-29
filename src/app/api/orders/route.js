import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/authOptions/route";
import {Order} from "@/models/Order"
import { isAdmin } from "../isAdmin/route";

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    let admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if(_id){
        return Response.json(await Order.findById(_id));
    }
    if(admin){
        return Response.json(await Order.find());
    }
    if(email){
        return Response.json(await Order.find({email}));
    }
}