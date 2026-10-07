import type { MySession } from '@/app/_types/users';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';
export { MySession };

const authConfig: NextAuthConfig = {
	trustHost: true,
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],

	callbacks: {
		/*, request*/
		authorized({ auth }) {
			return !!auth;
		},
		async signIn({ user }) {
			if (!user.email) return false;

			const guest = await getGuest(user.email);
			if (!guest) {
				await createGuest({
					email: user.email,
					fullName: user.name,
				});
			}

			return true;
		},
		async session({ session }) {
			const guest = await getGuest(session.user.email);
			if (!guest) throw new Error('Guest profile could not be loaded');

			const typedSession = session as MySession;

			typedSession.user.guestId = guest.id;

			return typedSession;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
