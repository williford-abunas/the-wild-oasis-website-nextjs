import NextAuth, { type NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { Session, Account, Profile, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import { createGuest, getGuest } from "./data-service";
import { AdapterUser } from "next-auth/adapters";

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
      async signIn({ user }: { user: User | AdapterUser }): Promise<boolean> {
        try {
          const guest = await getGuest(user.email as string);

          if (!guest) {
           await createGuest({ 
             email: user.email as string, 
             full_name: user.name as string,
           });
            }

            return true;
        } catch (error) {
          console.error("signIn error:", error);
          return false;
        }
      },
      async jwt({ token, account, profile }: { token: JWT; account?: Account | null; profile?: Profile }) {
        // Store user image in token
        if (account && profile) {
            token.picture = profile.picture;
        }
        return token;
    },
      async session({ session, token }: { session: Session; token: JWT }) {
            const guest = await getGuest(session.user?.email as string);
            
            if (guest && session?.user) {
              session.user.guestId = guest.id.toString();
            }
            // Ensure user image is included in session
            if (token?.picture && session.user) {
                session.user.image = token.picture as string;
            }
            return session;
        },
      
    },
    pages: {
        signIn: "/login",
    },
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(authConfig);