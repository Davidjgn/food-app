import { getServerSession } from "next-auth/next";
import authOptions from "@/libs/authOptions";
import {UserInfo} from '@/models/UserInfo';

export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if(!email){
        return false;
    }
    const userInfo = await UserInfo.findOne({email:email});
    if(!userInfo){
        return false;
    }

    return userInfo.admin;
}