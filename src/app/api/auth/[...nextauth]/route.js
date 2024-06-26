import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from '@/models/User';
import {UserInfo} from '@/models/UserInfo';
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongoConnect";
import authOptions from "@/libs/authOptions";

/*
export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({email});
                const passwordOk = user && bcrypt.compareSync(password, user.password);

                if(passwordOk){
                    return user;
                }

                return null
            }
        })
    ]
};*/
/*
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
}*/

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }