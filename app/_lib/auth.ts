import NextAuth, { type NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { Session, Account, Profile } from "next-auth"
import type { JWT } from "next-auth/jwt"

const authConfig: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
      authorized({auth}) {
    
        return !!auth?.user;
      },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Ensure user image is included in session
            if (token?.picture && session.user) {
                session.user.image = token.picture as string;
            }
            return session;
        },
        async jwt({ token, account, profile }: { token: JWT; account?: Account | null; profile?: Profile }) {
            // Store user image in token
            if (account && profile) {
                token.picture = profile.picture;
            }
            return token;
        },
    },
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(authConfig);