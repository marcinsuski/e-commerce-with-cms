import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

interface Client {
    clientId: string;
    clientSecret: number;
}

export default NextAuth({
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
});
