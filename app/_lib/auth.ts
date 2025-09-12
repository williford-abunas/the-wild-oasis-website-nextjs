import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // Ensure user image is included in session
            if (token?.picture) {
                session.user.image = token.picture as string;
            }
            return session;
        },
        async jwt({ token, account, profile }) {
            // Store user image in token
            if (account && profile) {
                token.picture = profile.picture;
            }
            return token;
        },
    },
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(authConfig);