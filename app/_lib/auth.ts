import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(authConfig);